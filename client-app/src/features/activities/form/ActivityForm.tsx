import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

type Event = HTMLInputElement | HTMLTextAreaElement;

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { loading, loadActivity } = activityStore;
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((act) => setActivity(act!));
    }
  }, [id, loadActivity]);

  const handleSubmit = () => {
    console.log(activity);
    activity.id
      ? activityStore.updateActivity(activity)
      : activityStore.createActivity(activity);
    history.push("/activities");
  };

  const handleOnChange = (e: ChangeEvent<Event>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };
  // if (loadInitial) return <Loading content="Loading..."></Loading>;

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
          type="date"
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
          type="button"
          content="Submit"
          loading={loading}
          onClick={handleSubmit}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={Link}
          to="/activities"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
