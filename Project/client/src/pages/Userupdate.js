import React from 'react';
import {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Userupdate() {
    const navigate = useNavigate();
    const [userObject, setUserObject] = useState([]);

    // setUserObject({ username: "", email: "", phone: "", role: "" });

    useEffect(
        ()=>{
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
      } else {
        axios.get(`http://localhost:3001/auth/byId/:id` ,{
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }
            ).then((response)=>{
                setUserObject({
                    username:  response.data.username,
                    email:  response.data.email,
                    phone: response.data.phone ,
                    role: response.data.role
                });
        });
    }
        });
      

        // const initialValues = {
        //     username: "",
        //     email:"",
        //     phone:"",
        //     role:"user"
        // };
    

        const update = (data) => {
            axios.put("http://localhost:3001/auth/update/:id", data
            
            ).then((response) => {
              navigate("/usermanage");
            });
          };



        //   const validationSchema= Yup.object().shape({
        //     username:Yup.string().min(3).max(15).required(), 
        //     email:Yup.string().email().required(), 
        //     phone:Yup.string().required(), 
        //     role:Yup.string().oneOf(['admin','user'])
        // }); 
          const [userName, setUserName] = useState([]);
          const [email, setEmail] = useState([]);
          const [phone, setPhone] = useState([]);
          const [role, setRole] = useState([]);

  return (
    <div>
      <div className="">
      
      <h1>Update Info:{userObject.username}</h1>
        <div className='form'>
          <label>User Name:</label>
          <input type = "text" name = "userName" onChange={(e)=>{
            setUserName(e.target.value) 
          }}>{userObject.username}</input>
          <label>Email:</label>
          <input type = "text" name = "email" onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          <label>Phone:</label>
          <input type = "text" name = "phone" onChange={(e)=>{
            setPhone(e.target.value)
          }}/>
          <label>Role:</label>
          <input type = "text" name = "role" onChange={(e)=>{
            setRole(e.target.value)
          }}/>

            <button onClick={()=>{
            update({
                username: userName,
                email: email,
                phone: phone,
                role: role
            })
            }}>Update</button>
            </div>
        
            </div>
















        {/* <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>User Name:</label>
            <ErrorMessage name="username" component="span" />
            <input 
            id="inputCreateUser" 
            name="username" 
            value={userObject.username}
            >{userObject.username}</input>

            

            <label>Email:</label>
            <ErrorMessage name="email" component="span" />
            <Field
              id="inputCreateUser"
              name="email"
              value={userObject.email}
            />

                     
            <label>Phone:</label>
            <ErrorMessage name="phone" component="span" />
            <Field
              id="inputCreateUser"
              name="phone"
              value={userObject.phone}
            
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
        </Formik> */}
      </div>
   
  )
}

export default Userupdate
