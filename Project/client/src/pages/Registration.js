import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const { Users } = require("../models");

function Registration() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      navigate("/login");
    });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
    confirmpassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
    phone: Yup.string().required(),
  });

  return (
    <div className="login-container">
      <div className="formContainer">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="form-outline mb-4">
              <label className="form-label">User Name:</label>
              <ErrorMessage name="username" component="span" />
              <Field
                className="form-control"
                id="inputCreateUser"
                name="username"
                placeholder="John"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Email:</label>
              <ErrorMessage name="email" component="span" />
              <Field
                className="form-control"
                id="inputCreateUser"
                name="email"
                placeholder="Your email"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Password:</label>
              <ErrorMessage name="password" component="span" />
              <Field
                className="form-control"
                id="inputCreateUser"
                type="password"
                name="password"
                placeholder="Your password"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Confirm Password:</label>
              <ErrorMessage name="confirmpassword" component="span" />
              <Field
                className="form-control"
                id="inputCreateUser"
                type="password"
                name="confirmpassword"
                placeholder="Retype password"
              />
            </div>
            <div>
              <label className="form-label">Phone:</label>
              <ErrorMessage name="phone" component="span" />
              <Field
                className="form-control"
                id="inputCreateUser"
                name="phone"
                placeholder="Your phone"
              />
              <br></br>
            </div>

            <button type="submit" className="login-button">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
