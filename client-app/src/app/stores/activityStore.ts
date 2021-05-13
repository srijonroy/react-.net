import { Activity, ActivityFormValues } from "./../models/activity";
import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../api/agent";
import { v4 as uuidv4 } from "uuid";
import { store } from "./store";
import { Profile } from "../models/Profile";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadInitial = true;

  constructor() {
    makeAutoObservable(this, {});
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    const activities = await Agent.Activities.list();
    runInAction(() => {
      try {
        activities.forEach((act) => {
          this.setActivity(act);
        });
        this.loadInitial = false;
      } catch (err) {
        runInAction(() => {
          console.log(err);
        });
      }
    });
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadInitial = true;
      try {
        activity = await Agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.loadInitial = false;
        return activity;
      } catch (err) {
        console.log(err);
        this.loadInitial = false;
      }
    }
  };

  private setActivity = (act: Activity) => {
    const user = store.userStore.user;
    if (user) {
      act.isGoing = act.attendees!.some((a) => a.userName === user.userName);
      act.isHost = act.hostUserName === user.userName;
      act.host = act.attendees?.find((x) => x.userName === act.hostUserName);
    }
    act.date = new Date(act.date);
    this.activityRegistry.set(act.id, act);
  };

  private getActivity(id: string) {
    return this.activityRegistry.get(id);
  }

  deleteActivity = async (id: string) => {
    await Agent.Activities.delete(id);
    runInAction(() => {
      this.activityRegistry.delete(id);
      this.selectedActivity = undefined;
    });
  };

  createActivity = async (activity: ActivityFormValues) => {
    activity.id = uuidv4();
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    const newActivity = new Activity(activity);
    newActivity.hostUserName = user!.userName;
    newActivity.attendees = [attendee];
    this.setActivity(newActivity);
    try {
      await Agent.Activities.create(activity);
      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (err) {
      console.log(err);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await Agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          this.activityRegistry.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await Agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.userName !== user?.userName
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivity = async () => {
    this.loading = true;
    try {
      await Agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity!.isCancelled;
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
}
