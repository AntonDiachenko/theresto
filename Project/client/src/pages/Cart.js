import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../helpers/AuthContext";

function Cart() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [jsonObject, setJsonObject] = useState(0);
  var sum = 0;
  var tax = 0;
  var Total = 0;


const multiple=(a,b)=>{
  const itemTotal = a * b;

  sum = sum + itemTotal;
  tax = sum*0.15;
  Total = sum+tax;
  return itemTotal;
}
  


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/cart/byuserId`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setCartList(response.data);
        });
    }
  }, []);

  // const updatequantity = (id, quantity) => {
  //   axios
  //     .put(
  //       `http://localhost:3001/cart/update`,
  //       {
  //         MenuitemId: id,
  //         quantity: quantity + 1,
  //       },
  //       { headers: { accessToken: localStorage.getItem("accessToken") } }
  //     )
  //     .then((response) => {
  //       navigate(0);
  //     });
  // };

  const increase =(id,quantity) => {
    quantity=quantity+1;
    axios.put(`http://localhost:3001/cart/update`,{
      MenuitemId:id,
      quantity:quantity
    },
    { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
     navigate(0);
   
    });
  }

  const reduce =(id,quantity) => {
    quantity=quantity-1;
    if (quantity>0) {
      axios.put(`http://localhost:3001/cart/update`,{
        MenuitemId:id,
        quantity:quantity
      },
      { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
       
        navigate(0);
      });
    } else {
      axios.delete(
        `http://localhost:3001/cart/delete/${id}`,
        
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      ).then((response)=>{
        navigate(0);
        });
    }
    
  }

  const clear =()=>{
    axios.delete(
      `http://localhost:3001/cart/delete`,
      
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    ).then((response)=>{
      navigate(0);
      });
  }


  return (
    <div>
      <div class=" container col  mb-5">
        <div className="row d-flex row-clo-2">
          <h2 className="col-8">Cart List:</h2>
          <button 
          className="col-2 crud-button"
          onClick={()=>{
                          clear();
                        }} 
          >Clear All</button>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th className="col-4">Item</th>
              <th className="col-3">quantity</th>
              <th className="col-2">price</th>
              <th className="col-3">subtotal</th>
            </tr>

            {cartList.map((value, key) => {
              return ( 
            <tr>
              <td className="col-4">
                  <div className="d-flex row row-cols-2 h-50 col-12">
                        <div className=" col-5 h-50 ">
                            <img className=" col-12" src={value.photoURL}/>
                        </div>
                        <div className=" col-7">
                            <div className=" " > Itemname :</div>
                            <div className=" mb-3" > {value.itemname} </div> 
                            <div className=" " >  Item Description :</div>
                            <div className="mb-3 " > {value.description} </div> 
                        </div>
                               
                  </div>
              </td>
              <td className="col-2">
                <div className="row">
                        <button onClick={()=>{
                          increase(value.MenuitemId,value.quantity);
                        }} className="col-1">+</button>
                        <div  className="col-2">{value.quantity}</div>
                        <button onClick={()=>{
                          reduce(value.MenuitemId,value.quantity);
                        
                        }}  className="col-1 mx-1">-</button>
                </div>
              </td>
              <td className="col-2">$ {value.price}</td>
              <td className="col-3" >$ {multiple(value.quantity, value.price)}</td>
              
            </tr>
            
            // 3个问题，1 数量，2数量改变subtotal跟着改变，3确定提交order
              );
            })};
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>Sum:</td>
              <td>$ {sum}</td>
            </tr>
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>Tax:</td>
              <td>$ {tax}</td>
            </tr>
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>Total:</td>
              <td>$ {Total}</td>
            </tr>

          </thead>
        </table>
      </div>
    </div>
  );
}

export default Cart;
