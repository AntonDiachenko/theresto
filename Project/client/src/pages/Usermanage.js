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
  const [userObject, setUserObject] = useState([])
  const [htmlObject, setHtmlObject] = useState([])



  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:3001/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
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
    <div class="d-flex">
      <div class=" container col-5  mb-5">
        <div className="row">
          <h2 className="col">User List:</h2>
          <button
            className="btn btn-sm  btn-outline-danger  col-2"
            onClick={() => {
              navigate("/newuser");
            }}
          >
            Add a new User
          </button>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th className="col-1">UserId</th>
              <th className="col-1">UserName</th>
              <th className="col-2">Email</th>
              <th className="col-2">Phone</th>
              <th className="col-1">Role</th>
            </tr>

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
                      className="btn   btn-outline-danger  col-6"
                      onClick={() => {
                        deleteUser(value.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-danger  col-6"
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
          </thead>
        </table>
        
      </div>
      <div class=" container col-5  mb-5">
          
        <input type="text" placeholder="search by username" onChange={(e) => {
            setUsername(e.target.value);
          }}></input>
          <button className="btn btn-sm  btn-outline-danger  col-2"
          onClick={ () => {
            axios.get(`http://localhost:3001/auth/${username}`).then((response) => {
              setUserObject(response.data);
              
            });
      
            }}
           >search</button>
           <div className='container '>
                <h2>Info of the User:</h2> 
                <div className="input-group mb-1">
                    <span class="input-group-text col-3">UserId:</span> 
                    <div className='form-control col'>{userObject.id}</div>
                </div>
                <div className="input-group mb-1">
                    <span class="input-group-text col-3">Username:</span> 
                    <div className='form-control col'>{userObject.username}</div>
                </div>
                <div className="input-group my-2">
                    <span class="input-group-text col-3">Email:</span> 
                    <div className="form-control col">{userObject.email}</div>
                </div>
                <div className="input-group my-2">
                    <span class="input-group-text col-3  ">Phone:</span> 
                    <div className="form-control col text-break ">{userObject.phone}</div>      
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
