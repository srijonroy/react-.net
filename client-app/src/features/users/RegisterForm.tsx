import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Label, Modal } from "semantic-ui-react";
import CustomInput from "../../app/common/form/CustomInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore, modalStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) =>
          setErrors({
            error,
          })
        )
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
          autoSave="off"
        >
          <Header as="h2" content="Sign Up!" color="teal" textAlign="center" />
          <CustomInput name="displayName" placeholder="Display Name" />
          <CustomInput name="username" placeholder="User Name" />
          <CustomInput name="email" placeholder="Email" />
          <CustomInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            // render={() => <Label content={errors.error} />}
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Container textAlign="center">
            <Button
              disabled={!isValid || !dirty || isSubmitting}
              loading={isSubmitting}
              positive
              content="Sign Up"
              type="submit"
            />
            <Button onClick={modalStore.closeModal} content="Cancel" negative />
          </Container>
        </Form>
      )}
    </Formik>
  );
});
