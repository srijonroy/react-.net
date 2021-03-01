import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

const ActivityDetails = ({
  activity,
  cancelSelectActivity,
  openForm,
}: Props) => (
  <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} size="big" />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className="date">{activity.date}</span>
      </Card.Meta>
      <Card.Description>{activity.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button
        basic
        color="blue"
        content="Edit"
        onClick={() => openForm(activity.id)}
      ></Button>
      <Button
        basic
        color="grey"
        content="Cancel"
        onClick={() => cancelSelectActivity()}
      ></Button>
    </Card.Content>
  </Card>
);

export default ActivityDetails;
