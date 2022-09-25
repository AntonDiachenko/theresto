import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Usermanage() {
  const { id } = useParams();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [username, setUsername] = useState([]);
  let navigate = useNavigate();
  const [userObject, setUserObject] = useState([]);
  const [htmlObject, setHtmlObject] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/auth`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfUsers(response.data);
        });
    }
  }, []);

  const deleteUser = (id) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .delete(`http://localhost:3001/auth/delete/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          navigate(0);
        });
    }
  };

  return (
    <div class="user-manage-container">
      <div class="user-info-search">
        <div class="user-info-search-div">
          <h3>User Info:</h3>
        </div>
        <div class="user-info-search-div">
          <input
            type="text"
            placeholder="search by username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>
        <div class="user-info-search-div">
          <button
            className="crud-button"
            onClick={() => {
              axios
                .get(`http://localhost:3001/auth/${username}`)
                .then((response) => {
                  setUserObject(response.data);
                });
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div class="user-info-container">
        <div className="container ">
          <div className="input-group my-2">
            <span class="input-group-text col-4">User Id:</span>
            <div className="form-control col">{userObject.id}</div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-4">Username:</span>
            <div className="form-control col">{userObject.username}</div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-4">Email:</span>
            <div className="form-control col">{userObject.email}</div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-4">Phone:</span>
            <div className="form-control col text-break ">
              {userObject.phone}
            </div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-4">Role:</span>
            <div className="form-control col">{userObject.role}</div>
          </div>
        </div>
      </div>

      <div class="user-list-container mt-5">
        <div className="row pe-3">
          <h3 className="col">User List:</h3>
          <button
            className="crud-button  col-2"
            onClick={() => {
              navigate("/newuser");
            }}
          >
            Add User
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th className="col-1">UserId</th>
              <th className="col-1">UserName</th>
              <th className="col-2">Email</th>
              <th className="col-2">Phone</th>
              <th className="col-1">Role</th>
            </tr>
          </thead>
            {listOfUsers.map((value, key) => {
              return (
                <tbody>
                  <tr>
                    <td className="col-1">{value.id}</td>
                    <td className="col-2">{value.username}</td>
                    <td className="col-3">{value.email}</td>
                    <td className="col-2">{value.phone}</td>
                    <td className="col-1">{value.role}</td>
                    <td className="col-3 edit-delete">
                      {" "}
                      <button
                        className="crud-button"
                        onClick={() => {
                          deleteUser(value.id);
                        }}
                      >
                        Delete
                      </button>
                      &nbsp;
                      <button
                        className="crud-button"
                        onClick={() => {
                          navigate(`/update/${value.id}`);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}

        </table>
      </div>
    </div>
  );
}

export default Usermanage;
