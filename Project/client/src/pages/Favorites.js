import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Favorites() {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:3001/fav/byUserId`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setMenuList(response.data);
      });
    };

    
  }, []);


  const isCart=(isCart)=>{
    if (isCart===1) {
      return "del";
    } else {
      return "add"
    }
}


  const favpost = (id) => {
    axios
      .post(
        "http://localhost:3001/fav",
        { MenuitemId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )}
  const addToCart = (quantity, MenuitemId, price) => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        } else {
          axios
            .post(
              "http://localhost:3001/cart",
              {
        
                quantity: quantity,
                MenuitemId: MenuitemId,
                price: price,
              
              },
              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },
              }
            )
            .then((response) => {
              if (response.data.error) {
                console.log(response.data.error);
              } else {
                alert("Item Added To Cart");
              }
            });
        }
      };


  return (
    <div className="col-10 mx-5 ">
        <div className="row  g-2  row-cols-md-4 ">
          {menuList.map((value, key) => {
            return (
              <div className="col ">
                <div className="card h-100">
                  <img src={value.photoURL} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5
                      className="card-title"
                    >
                      {value.itemname}
                    </h5>
                    <p className="card-text">{value.description}</p>
                  </div>

                  <div  className="row card-footer">
                    <div className="col-6">
                        <p className="text-muted ">${value.price}</p>
                      </div>
                          <button  className="btn btn-sm  btn-outline-danger  col-3"
                                onClick={ ()=>{
                                  favpost(value.MenuitemId);
                                  navigate(0);
                                }
                              }
                                >cancel</button>
                          <button
                             onClick={()=>{
                              addToCart( 1, value.MenuitemId, value.price);
                              navigate(0);
                            } 
                            }
                            className="btn btn-success btn-sm col-3"
                          >
                             {isCart(value.isCart)} 
                          </button>
                      </div>
                    </div>
                </div>
              
            );
          })}
         
        </div>

       
      </div>
  )
}

export default Favorites
