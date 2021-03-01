import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity: Activity) => void;
}

type Event = HTMLInputElement | HTMLTextAreaElement;

const ActivityForm = ({
  closeForm,
  activity: selectedActivity,
  createOrEdit,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  const handleSubmit = () => {
    console.log(activity);
    createOrEdit(activity);
  };

  const handleOnChange = (e: ChangeEvent<Event>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          content={activity?.title}
          value={activity.title}
          name="title"
          onChange={handleOnChange}
        />
        <Form.TextArea
          placeholder="Description"
          content={activity?.description}
          value={activity.description}
          name="description"
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder="Category"
          content={activity?.category}
          value={activity.category}
          name="category"
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder="Date"
          content={activity?.date}
          value={activity.date}
          name="date"
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder="City"
          content={activity?.city}
          value={activity.city}
          name="city"
          onChange={handleOnChange}
        />
        <Form.Input
          placeholder="Venue"
          content={activity?.venue}
          value={activity.venue}
          name="venue"
          onChange={handleOnChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          onClick={() => handleSubmit()}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => closeForm()}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
