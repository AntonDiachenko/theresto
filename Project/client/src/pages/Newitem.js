
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
<div className="reg-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="reg-form">
            <label>Item Name:</label>
            <ErrorMessage name="itemname" component="span" />
            <Field 
            name="itemname" 
            />

            <label>Description:</label>
            <ErrorMessage name="description" component="span" />
            <Field
              name="description"

            />

            <label>Price:</label>
            <ErrorMessage name="price" component="span" />
            <Field
              name="price"
            />

            <label>PhotoURL:</label>
            <ErrorMessage name="photoURL" component="span" />
            <Field
              name="photoURL"
            />

            <label>CategoryId:</label>
            <ErrorMessage name="CategoryId" component="span" />
            <Field
              name="CategoryId"
            />

            <button type="submit">NewItem</button>
          </Form>
        </Formik>
      </div>


        {/* <div className="">
       
            <div className="form">
            <label>Item Name:</label>
            <input
                type="text"
                name="itemName"
                onChange={(e) => {
                setItemName(e.target.value);
                }}
            />

            <label>Description:</label>
            <input
                type="text"
                name="description"
                onChange={(e) => {
                setDescription(e.target.value);
                }}
            />

            <label>Price:</label>
            <input
                type="text"
                name="price"
                onChange={(e) => {
                setPrice(e.target.value);
                }}
            />

            <label>PhotoURL:</label>
            <input
                type="text"
                name="photoURL"
                onChange={(e) => {
                setPhotoURL(e.target.value);
                }}
            />

            <button
                onClick={() => { newitem()}}
            >
                NewItem
            </button>
            </div>
        </div> */}
    </div>
  )
}

export default Newitem
