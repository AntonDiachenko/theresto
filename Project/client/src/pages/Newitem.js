
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
    <div>
<div className="container col-6">
        <Formik 
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="reg-form col-6">
            <div >
            <label className="col-4">Item Name:</label>
            <ErrorMessage className="col-8" name="itemname" component="span" />
            <Field  className="col-8"
            name="itemname" 
            /></div>

            <div className="">
            <label className="col-4">Description:</label>
            <ErrorMessage className="col-8" name="description" component="span" />
            <Field className="col-8"
              name="description"
            /></div>
            <div className="">
            <label className="col-4">Price:</label>
            <ErrorMessage className="col-8" name="price" component="span" />
            <Field className="col-8"
              name="price"
            /></div>
            <div className="">
            <label className="col-4">PhotoURL:</label>
            <ErrorMessage className="col-8" name="photoURL" component="span" />
            <Field className="col-8"
              name="photoURL"
            /></div>
            <div className="">
            <label className="col-4">CategoryId:</label>
            <ErrorMessage className="col-8" name="CategoryId" component="span" />
            <Field className="col-8"
              name="CategoryId"
            /></div>

            <button type="submit">addItem</button>
          </Form>
        </Formik>
      </div>

    </div>
  )
}

export default Newitem
