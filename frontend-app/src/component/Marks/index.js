import React, { useState } from "react";
import * as Yup from "yup";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  DisableFormField,
} from "../forms";
import "./Marks.css";
import config from "../../config";

const validationSchema = Yup.object().shape({
  roll_no: Yup.number()
    .required()
    .label("roll no.")
    .typeError("you must specify a number"),
  name: Yup.string().required().label("name"),
  math_marks: Yup.number()
    .required()
    .label("math marks")
    .typeError("you must specify a number"),
  physics_marks: Yup.number()
    .required()
    .label("physics marks")
    .typeError("you must specify a number"),
  chemistry_marks: Yup.number()
    .required()
    .label("chemistry marks")
    .typeError("you must specify a number"),
  total_marks: Yup.number().label("total marks"),
  percentage: Yup.number().label("percentae"),
});

function Login() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setLoginFailed(false);
    fetch(`${config.url}/api/addTask`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          setLoginFailed(true);
          throw new Error("Failed!");
        }
        setShow(true);
        return res.json();
      })
      .then((resData) => {
        console.log({ resData });
        setTimeout(() => setShow(false), 2000);
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ width: "70%" }}>
      <div className="toast-area" id="toasts">
        <div style={{ display: !show ? "none" : "" }}>
          <div className="toast" id="clonemother">
            <div className="toast-content">
              <div className="before"></div>
              <div
                className="icon"
                dangerouslySetInnerHTML={{ __html: "&#x2714" }}
              />
              <div className="text">
                <p>Success</p>
                <p className="message">
                  Student details submitted successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Form
        initialValues={{
          roll_no: "",
          name: "",
          math_marks: "",
          chemistry_marks: "",
          physics_marks: "",
          total_marks: "",
          percentage: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className="form_container">
          <h4>Enter student details</h4>
          <FormField name="roll_no" placeholder="roll_no" />
          <FormField name="name" placeholder="name" />
          <FormField name="math_marks" placeholder="math marks (out of 100)" />
          <FormField
            name="chemistry_marks"
            placeholder="chemistry marks (out of 100)"
          />
          <FormField
            name="physics_marks"
            placeholder="physics marks (out of 100)"
          />
          <DisableFormField
            name="total_marks"
            placeholder="total marks (out of 300)"
          />
          <DisableFormField name="percentage" placeholder="percentage " />
          <ErrorMessage error="Network Error" visible={loginFailed} />
          <SubmitButton title="Login" />
        </div>
      </Form>
    </div>
  );
}

export default Login;
