import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

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
          role: response.data.role,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="formContainer">
        
          <form>
            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example1">
                Username:
              </label>              
              <input
                type="text"
                id="form2Example1"
                class="form-control"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example2">
                Password:
              </label>              
              <input
                type="password"
                id="form2Example2"
                class="form-control"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button type="button" className="login-button" onClick={login}>
              Log in
            </button>
                <br></br><br></br>
            <div class="text-center">
              <p>
                Not a member? <Link to="/registration">Register</Link>
              </p>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Registration;
