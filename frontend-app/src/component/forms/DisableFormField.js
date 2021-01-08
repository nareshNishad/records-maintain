import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();
  const sum =
    (parseInt(values["math_marks"]) || 0) +
    (parseInt(values["chemistry_marks"]) || 0) +
    (parseInt(values["physics_marks"]) || 0);

  useEffect(() => {
    if (name === "total_marks") return setFieldValue(name, sum);
    setFieldValue(name, sum / 3);
  }, [sum]);
  return (
    <>
      <input
        value={name === "total_marks" ? sum : sum / 3}
        disabled
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
