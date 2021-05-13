import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import CustomInput from "../../../app/common/form/CustomInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelect from "../../../app/common/form/CustomSelect";
import CustomDate from "../../../app/common/form/CustomDate";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { loadActivity } = activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Please provide Title"),
    description: Yup.string().required("Please provide Description"),
    category: Yup.string().required("Please provide Category"),
    city: Yup.string().required("Please provide City"),
    venue: Yup.string().required("Please provide venue"),
    date: Yup.string().required("Please provide a date").nullable(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((act) =>
        setActivity(new ActivityFormValues(activity))
      );
    }
  }, [id, activity, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    console.log(activity);
    activity.id
      ? activityStore.updateActivity(activity)
      : activityStore.createActivity(activity);
    history.push("/activities");
  };

  // const handleOnChange = (e: ChangeEvent<Event>) => {
  //   const { name, value } = e.target;
  //   setActivity({ ...activity, [name]: value });
  // };
  // // if (loadInitial) return <Loading content="Loading..."></Loading>;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <CustomInput name="title" placeholder="Title" />

            <CustomTextArea
              rows={3}
              placeholder="Description"
              name="description"
            />
            <CustomSelect
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <CustomDate
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <CustomInput placeholder="City" name="city" />
            <CustomInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isSubmitting}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to="/activities"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
