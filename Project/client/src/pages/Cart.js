
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../helpers/AuthContext";

function Cart() {
  
  const [cartList, setCartList] = useState([]);
  function plus(a,b){
    return a*b
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/cart/byuserId`,
    { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      setCartList(response.data);
      
    });
  }, []);



  return (
    <div>
      <div class=" container col-5  mb-5">
        <div className="row">
          <h2 className="col">Cart List:</h2>
        </div>
        
        <table class="table table-striped">
          <thead>
            <tr>
              <th className="col-1">Itemname</th>
              <th className="col-1">quantity</th>
              <th className="col-2">price</th>
              <th className="col-1">total</th>
            </tr>

            {cartList.map((value, key) => {
              return ( 
            <tr>
              <td className="col-1">{value.itemname}</td>
              <td className="col-1">{value.quantity}</td>
              <td className="col-2">{value.price}</td>
              <td className="col-3" >'plus(value.quantity,value.price)';</td>
            </tr>
              );
            })}
          </thead>
        </table>
        
      </div>
    </div>
  );
}

export default Cart;