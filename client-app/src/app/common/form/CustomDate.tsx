import { useField } from "formik";
import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Form } from "semantic-ui-react";

export default function CustomDate(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <ReactDatePicker
        {...field}
        {...props}
        selected={field.value && new Date(field.value)}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <span style={{ color: "red" }}>{meta.error}</span>
      ) : null}
    </Form.Field>
  );
}
