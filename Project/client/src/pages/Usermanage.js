import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Usermanage() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [username, setUsername] = useState([]);
  let navigate = useNavigate();
  const [userObject, setUserObject] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:3001/auth`).then((response) => {
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
    <div class="container-md mt-5 ">
      <div className="add-user-container">
        <h2 className="col">User List:</h2>
        <button
          className="crud-button"
          onClick={() => {
            navigate("/newuser");
          }}
        >
          Add User
        </button>
      </div>

      {listOfUsers.map((value, key) => {
        return (
          <tr>
            <td className="col-1">{value.id}</td>
            <td className="col-1">{value.username}</td>
            <td className="col-2">{value.email}</td>
            <td className="col-2">{value.phone}</td>
            <td className="col-1">{value.role}</td>
            <td className="col-3">
              {" "}
              <button
                className="crud-button"
                onClick={() => {
                  deleteUser(value.id);
                }}
              >
                Delete
              </button>
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
        );
      })}

      <div class=" container-md mt-5">
        <div className="container ">
          <div className="add-user-container">
            <h2 className="col">Info of the User:</h2>
            <input
              type="text"
              placeholder="search by username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <button
              className="crud-button  col-1"
              onClick={() => {
                axios
                  .get(`http://localhost:3001/auth/byname/${username}`, {
                    headers: {
                      accessToken: localStorage.getItem("accessToken"),
                    },
                  })
                  .then((response) => {
                    setUserObject(response.data);
                  });
              }}
            >
              search
            </button>
          </div>
          <div className="input-group mb-1">
            <span class="input-group-text col-3">UserId:</span>
            <div className="form-control col">{userObject.id}</div>
          </div>
          <div className="input-group mb-1">
            <span class="input-group-text col-3">Username:</span>
            <div className="form-control col">{userObject.username}</div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-3">Email:</span>
            <div className="form-control col">{userObject.email}</div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-3  ">Phone:</span>
            <div className="form-control col text-break ">
              {userObject.phone}
            </div>
          </div>
          <div className="input-group my-2">
            <span class="input-group-text col-3">Role:</span>
            <div className="form-control col">{userObject.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usermanage;
