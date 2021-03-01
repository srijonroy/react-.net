import { relative } from "path";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelect: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelect,
  editMode,
  openForm,
  closeForm,
  handleCreateOrEditActivity,
  handleDeleteActivity,
}: Props) => {
  console.log(selectedActivity);
  return (
    <>
      <Grid>
        <Grid.Column width="8">
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            cancelSelect={cancelSelect}
            deleteActivity={handleDeleteActivity}
          />
        </Grid.Column>
        <Grid.Column width="8">
          {selectedActivity && !editMode && (
            <ActivityDetails
              activity={selectedActivity}
              cancelSelectActivity={cancelSelect}
              openForm={openForm}
            />
          )}
          {editMode && (
            <ActivityForm
              closeForm={closeForm}
              activity={selectedActivity}
              createOrEdit={handleCreateOrEditActivity}
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default ActivityDashboard;
