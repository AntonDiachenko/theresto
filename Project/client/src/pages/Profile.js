import React, { useEffect, useState } from "react";

import axios from "axios";

function Profile() {
  const [userObject, setUserObject] = useState("");
  const [listOfFav, setListOfFav] = useState([]);
  // const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/byuserId`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUserObject(response.data);
      });

    axios
      .get(`http://localhost:3001/fav/byUserId`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfFav(response.data);
      });
  }, []);

  return (
    <div className="container my-5">
      <div className="basicInfo">
        <h3> Username: {userObject.username} </h3>
        <br></br>
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

      <div className="listOfFavs my-5">
        <h3>User's Favorites:</h3>
        <br></br>

        {listOfFav.map((value, key) => {
          return (
            <div className="d-flex row row-cols-2 h-400 col-12">
              <div className="col-4">
                <img className="profileFavPics" src={value.photoURL} />
              </div>
              <div className=" col-8 h-400">
                <div className="mb-3 display-6">
                  <h5> Itemname : {value.itemname} </h5>
                </div>
                <div className="mb-3 display-6">
                  <h5> Item Description : {value.description}</h5>
                </div>
                <div className="mb-3 display-6">
                  <h5> Item Price : $ {value.price}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
