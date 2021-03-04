import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;
  console.log(groupedActivities);
  return (
    <>
      {groupedActivities.map(([group, activities]) => {
        return (
          <Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>

            {activities.map((activity) => {
              return <ActivityListItem key={activity.id} activity={activity} />;
            })}
          </Fragment>
        );
      })}
    </>
  );
};

export default observer(ActivityList);
