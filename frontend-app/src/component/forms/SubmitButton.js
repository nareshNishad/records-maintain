import React from "react";
import { useFormikContext } from "formik";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      onClick={handleSubmit}
      style={{ color: "palegreen", padding: "12px", backgroundColor: "brown" }}
    >
      {title}
    </button>
  );
}

export default SubmitButton;
