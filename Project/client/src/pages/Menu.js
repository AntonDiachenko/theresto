import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Menu() {
    const [menuList, setMenuList] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/Menu").then((response)=> {
        setMenuList(response.data);
      });
    }, []);  
  
  return (
    <div>
    {menuList.map((value, key) => {
        return (
            <div className="menuitem" onClick={() =>{navigate(`/Menu/${value.id}`)}}> 
                <div className="description"> {value.description} </div> 
                <div className="price"> {value.price} </div> 
                <div className="photoUrl"> {value.photoUrl} </div>
            </div>
        ); 
    }) }
  </div>
  );
}

export default Menu
