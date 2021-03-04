import { useField } from "formik";
import React from "react";
import { Form } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default function CustomInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span style={{ color: "red" }}>{meta.error}</span>
      ) : null}
    </Form.Field>
  );
}
