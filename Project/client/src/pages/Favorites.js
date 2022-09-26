import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Favorites() {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  const [count, setCount] = useState(0);
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

  const favpost = (id) => {
    axios
      .post(
        "http://localhost:3001/fav",
        { MenuitemId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )}
  const addToCart = (quantity, itemname, price) => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        } else {
          axios
            .post(
              "http://localhost:3001/cart",
              {
        
                quantity: quantity,
                itemname: itemname,
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
                  <img src="https://projectgofishing.blob.core.windows.net/gofishing/download.jpg?sv=2021-04-10&ss=bf&srt=co&se=2022-09-27T00%3A58%3A44Z&sp=rwl&sig=s32CK%2FSg5g3Lp25i%2F8B00SRuLu9xxtyf1YjEuI8u4ew%3D
" className="card-img-top" alt="..." />
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
                                  // addorcancel(value.id);
                                }
                                // {buttonText}
                              }
                                >cancel</button>
                          <button
                            onClick={(e) =>
                              addToCart( 1, value.itemname, value.price)
                            }
                            className="btn btn-success btn-sm col-3"
                          >
                            Add to cart
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
