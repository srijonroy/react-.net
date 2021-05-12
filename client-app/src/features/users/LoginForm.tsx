import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import CustomInput from "../../app/common/form/CustomInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((error) =>
          setErrors({
            error: "Invalid Email or Password",
          })
        )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          className="ui form"
          onSubmit={handleSubmit}
          autoComplete="off"
          autoSave="off"
        >
          <Header
            as="h2"
            content="Hi There! Login!"
            color="teal"
            textAlign="center"
          />
          <CustomInput name="email" placeholder="Email" />
          <CustomInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.email}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
