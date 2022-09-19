import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import '../bootstrap-5.2.1/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom"; 
// const { Users } = require("../models");

function Registration() {
    const initialValues = {
        username:"",
        password:"",
    };

    const navigate = useNavigate();
    const onSubmit = (data)=>{

        axios.post("http://localhost:3001/auth", data).then((response)=>{
            navigate("/login");});

    };

    const validationSchema= Yup.object().shape({
        username:Yup.string().min(3).max(15).required(), 
        password:Yup.string().min(4).max(20).required(), 
  
    });   


  return (
    
    <div>
      <div className='createAuctionPage'>
        <Formik initialValues={initialValues}  onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className='formContainer'>
                <label>User Name:</label>
                <ErrorMessage name="username" component="span"/>
                <Field id="inputCreateAuction" name="username" placeholder="John" />
                <label>Password:</label>
                <ErrorMessage name="password" component="span"/>
                <Field id="inputCreateAuction" name="password" placeholder="Your password"/>
      
                <button type= "submit">Register</button>
            </Form>
        </Formik> 
      
        
    </div>
    </div>
  )
}

export default Registration
