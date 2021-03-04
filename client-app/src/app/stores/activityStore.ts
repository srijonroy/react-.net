import { Activity } from "./../models/activity";
import { makeAutoObservable, runInAction } from "mobx";
import Agent from "../api/agent";
import { v4 as uuidv4 } from "uuid";

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

  get groupedActivities () {
    return Object.entries(
      this.activitiesByDate.reduce((activities,activity) => {
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date] ? [...activities[date],activity] : [activity];
        return activities;
      },{} as {[key:string]: Activity[]})
    )
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
        })
        this.loadInitial = false;
        return activity;
      } catch (err) {
        console.log(err);
        this.loadInitial = false;
      }
    }
  };

  private setActivity = (act: Activity) => {
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

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuidv4();
    try {
      await Agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await Agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
