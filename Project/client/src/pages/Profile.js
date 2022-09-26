
import React, { useEffect, useState } from "react";

import axios from "axios";

function Profile() {
 

  const [userObject, setUserObject] = useState("");
  const [listOfFav, setListOfFav] = useState([]);
  // const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/byuserId`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
      setUserObject(response.data)
    });

    axios.get(`http://localhost:3001/fav/byUserId`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
      setListOfFav(response.data);
    });
  }, []);

  return (
    <div className="container col-6">
        <div className="basicInfo">
            
            <h1> Username: {userObject.username} </h1>
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
    
            {/* {authState.username === username && (
            <button
                onClick={() => {
                navigate("/changepassword");
                }}
            >
                {" "}
                Change My Password
            </button>
            )} */}
        </div>
        <div className="listOfFav">
            <h1>User's favorites:</h1>
            <div className="">
                {listOfFav.map((value, key) => {
                    return (
                        <div className="col mb-3">
                            <div className="d-flex row row-cols-2 h-400 col-12">
                                    <div className=" col-5 h-400">
                                        <img src="https://projectgofishing.blob.core.windows.net/gofishing/download.jpg?sv=2021-04-10&ss=bf&srt=co&se=2022-09-27T00%3A58%3A44Z&sp=rwl&sig=s32CK%2FSg5g3Lp25i%2F8B00SRuLu9xxtyf1YjEuI8u4ew%3D" />
                                    </div>
                                    <div className=" col-7 h-400">
                                        <h5 className="mb-3 display-6" > Itemname : {value.itemname} </h5>
                                        <div className="mb-3 display-6"> Item Description : {value.description}</div>
                                        <div className="mb-3 display-6"> Item Price : {value.price}</div>
                                    </div>
                               
                            </div>
                        </div>
                    );
                })}
                
            </div>
        </div>
    </div>
  );
}

export default Profile;
