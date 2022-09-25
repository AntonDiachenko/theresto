import React from "react";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Userupdate() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState([]);

  // setUserObject({ username: "", email: "", phone: "", role: "" });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/auth/byId/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setUserObject({
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            role: response.data.role,
          });
        });
    }
  }, []);

  // const initialValues = {
  //     username: "",
  //     email:"",
  //     phone:"",
  //     role:"user"
  // };

  const update = (data) => {
    axios
      .put(`http://localhost:3001/auth/update/${id}`, data)
      .then((response) => {
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
    <div className="login-container">
      <div className="formContainer">
        <h3>Update Info: {userObject.username}</h3>
        <br></br>

        <div className="form-outline mb-4">
          <label className="form-label">User Name:</label>
          <input
            className="form-control"
            type="text"
            name="userName"
            defaultValue={userObject.username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          {/* {userObject.username}
          </input> */}
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            type="text"
            name="email"
            defaultValue={userObject.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Phone:</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            defaultValue={userObject.phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Role:</label>
          <input
            className="form-control"
            type="text"
            name="role"
            defaultValue={userObject.role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <button
            className="login-button"
            onClick={() => {
              update({
                username: userName,
                email: email,
                phone: phone,
                role: role,
              });
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Userupdate;
