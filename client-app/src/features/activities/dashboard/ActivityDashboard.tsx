import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadInitial)
    return <Loading content="Loading Activities" />;
  return (
    <>
      <Grid>
        <Grid.Column width="12">
          <ActivityList />
        </Grid.Column>
        <Grid.Column width="4">
          <ActivityFilters></ActivityFilters>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default observer(ActivityDashboard);
