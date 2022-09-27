import React from "react";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  
function Newitem() {



    let navigate = useNavigate();


    const initialValues = {
        itemname:"",
        description:"",
        price:"",
        photoURL:"",
        CategoryId:"",
    };

    const onSubmit = (data) => {
        axios
          .post(`http://localhost:3001/menu`, data, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            navigate("/Itemmanage");
          });
      };

      const validationSchema= Yup.object().shape({
        itemname:Yup.string().required(), 
        description:Yup.string().required(), 
        price:Yup.number().required(), 
        photoURL:Yup.string().max(10000),
        CategoryId:Yup.number().required()
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
            <label className="form-label">Item Name:</label>
            <ErrorMessage name="itemname" component="span" />
            <Field className="form-control" name="itemname" />              
            </div>

            <div className="form-outline mb-4">
            <label className="form-label">Description:</label>
            <ErrorMessage name="description" component="span" />
            <Field className="form-control" name="description" />              
            </div>

            <div className="form-outline mb-4">
            <label className="form-label">Price:</label>
            <ErrorMessage name="price" component="span" />
            <Field className="form-control" name="price" />
            </div>

            <div className="form-outline mb-4">
            <label className="form-label">PhotoURL:</label>
            <ErrorMessage name="photoURL" component="span" />
            <Field className="form-control" name="photoURL" />              
            </div>

            <div className="form-outline mb-4">
            <label className="form-label">CategoryId:</label>
            <ErrorMessage name="CategoryId" component="span" />
            <Field className="form-control" name="CategoryId" />              
            </div>

            <button type="submit" className="login-button">Add Item</button>
          </Form>
        </Formik>
      </div>

    </div>
  )
}

export default Newitem
