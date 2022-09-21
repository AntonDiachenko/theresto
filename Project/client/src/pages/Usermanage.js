import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {useParams} from "react-router-dom";


function Usermanage() {

  const {id} = useParams();
  const [listOfUsers, setListOfUsers] = useState([]);
  
  const navigate = useNavigate();

  useEffect(()=>{
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
  } else {
    axios.get(`http://localhost:3001/auth/auth/` 
        ).then((response)=>{
          setListOfUsers(response.data);
    });


    // axios.get(`http://localhost:3001/auth/byId/${id}`
    //   ).then((response)=>{
    //     setUserObject(response.data);
    // });
  }
},[])


const deleteUser = (id)=>{
  if (!localStorage.getItem("accessToken")) {
      navigate("/login");
  } else {
  axios.delete(`http://localhost:3001/auth/delete/${id}`
        , {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
).then((response)=>{
      navigate(0);
  });
}
}

  return (
    <div class="auction1  container col-6 left mb-5">
            <div >
            <div className='row'>
            <h2 className='col'>User List:</h2> 
            <button className='btn btn-sm  btn-outline-danger  col-2' 
                                    onClick={()=>{navigate('/newuser')}}>Add a new User</button>
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
                
                        {listOfUsers.map((value, key)=>{
                            return  (
                                    <tr>
                                    <td className="col-1">{value.id}</td>
                                    <td className="col-1">{value.username}</td>
                                    <td className="col-2">{value.email}</td>
                                    <td className="col-2">{value.phone}</td>
                                    <td className="col-1">{value.role}</td>
                                    <td className="col-3"> <button className='btn   btn-outline-danger  col-6' onClick={()=>{deleteUser(value.id)}}>Delete</button>
                                    <button className='btn btn-outline-danger  col-6' 
                                    onClick={()=>{navigate(`/update/${value.id}`)}}>Edit</button></td>
                                    
                                    </tr>
                            );
                            
                        })}
                    </thead>
                </table>
            </div>
            
        </div>
  )
}

export default Usermanage
