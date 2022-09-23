import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addnewuser() {
    const initialValues = {
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        phone:"",
        role:"user"
    };

    const navigate = useNavigate();
    const onSubmit = (data) => {
      axios.post("http://localhost:3001/auth", data
      
      ).then((response) => {
        navigate("/usermanage");
      });
    };
  

    const validationSchema= Yup.object().shape({
        username:Yup.string().min(3).max(15).required(), 
        email:Yup.string().email().required(), 
        password:Yup.string().min(4).max(20).required(), 
        confirmpassword:Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
        phone:Yup.string().required(), 
        role:Yup.string().oneOf(['admin','user'])
    }); 
    

  return (
    <div>
      <div className="createAuctionPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>User Name:</label>
            <ErrorMessage name="username" component="span" />
            <Field 
            id="inputCreateUser" 
            name="username" 
            placeholder="John" 
            />

            <label>Email:</label>
            <ErrorMessage name="email" component="span" />
            <Field
              id="inputCreateUser"
              name="email"
              placeholder="Your email"
            />

            <label>Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field
              id="inputCreateUser"
              type="password"
              name="password"
              placeholder="Your password"
            />

            <label>Confirm Password:</label>
            <ErrorMessage name="confirmpassword" component="span" />
            <Field
              id="inputCreateUser"
              type="password"
              name="confirmpassword"
              placeholder="Retype password"
            />

            <label>Phone:</label>
            <ErrorMessage name="phone" component="span" />
            <Field
              id="inputCreateUser"
              name="phone"
              placeholder="Your phone"
            />

            <label>Role:</label>
            <ErrorMessage name="role" component="span" />
            <Field
              id="inputCreateUser"
              name="role"
              placeholder="Your role"
            />

            <button type="submit">Add a new User</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Addnewuser
