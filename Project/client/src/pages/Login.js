import React from 'react';
import  { useState, useContext } from "react";
import { AuthContext } from "../helper/AuthContext"
import axios from "axios";
import '../bootstrap-5.2.1/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom"; 

function Registration() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();
    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
              role:response.data.role,
            });
            navigate("/");
          }
        });
      };
        




  return (
    <div className="Container formContainer ">
      <label>Username:</label>
      <input
        type="text"
        
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  )
}

export default Registration;
