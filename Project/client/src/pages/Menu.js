import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Menu() {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/Categories", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setCategoryList(response.data);
      });

    axios
      .get("http://localhost:3001/Menu", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setMenuList(response.data);
      });

    // axios.get("http://localhost:3001/Categories/menujoin").then((response) => {
    //   setMenuList(response.data);
    // });
  }, []);

  const [userObject, setUserObject] = useState();
  const [buttonText, setButtonText] = useState();

  // const addorcancel= (id)=>{

  //   axios
  //   .get(`http://localhost:3001/fav/byId/${id}`,
  //   { headers: { accessToken: localStorage.getItem("accessToken") }
  //   })
  //   .then((response) => {
  //     setUserObject(response.data);
  //   });

  //   if (userObject.MenuitemId==id){
  //     setButtonText('cancel');
  //   }else{
  //     setButtonText('add to favorite');
  //   }

  // }

  const favpost = (id) => {
    axios.post(
      "http://localhost:3001/fav",
      { MenuitemId: id },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    );
  };

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
    <div className="d-flex  container col-12 my-5">
      <div className="col-3 px-3">
        <table className="table table-hover" name="categories">
          <thead>
            <tr>
              <th
                className="flex-column col-1 menu-item-hover"
                onClick={() => {
                  axios
                    .get(`http://localhost:3001/menu`, {
                      headers: {
                        accessToken: localStorage.getItem("accessToken"),
                      },
                    })
                    .then((response) => {
                      setMenuList(response.data);
                    });
                }}
              >
                All Categories
              </th>
            </tr>

            {categoryList.map((value, key) => {
              return (
                <tr>
                  <td
                    className="menu-item-hover"
                    onClick={() => {
                      axios
                        .get(`http://localhost:3001/menu/byId/${value.id}`, {
                          headers: {
                            accessToken: localStorage.getItem("accessToken"),
                          },
                        })
                        .then((response) => {
                          setMenuList(response.data);
                        });
                    }}
                  >
                    <a>{value.name}</a>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>

      <div className="col-9 px-3">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {menuList.map((value, key) => {
            return (
              <div className="col">
                <div className="card h-100 ">
                  <img
                    src={value.photoURL}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body ">
                    <h5 className="card-title">{value.itemname}</h5>

                    <p className="card-text">{value.description}</p>
                  </div>

                  <div className="card-footer">
                    <p className="text-muted ">${value.price}</p>
                    {/* <BookmarkAddIcon onClick={ ()=>{
                          favpost(value.id);
                        } }/> */}
                    <button
                      className="btn btn-sm  btn-outline-danger  col-3 "
                      onClick={() => {
                        favpost(value.id);
                      }}
                    >
                      fav
                    </button>
                    <button
                      onClick={(e) => addToCart(1, value.id, value.price)}
                      className="btn btn-success btn-sm col-3"
                    >
                      Add to cart
                    </button>
                  </div>

                  <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                  ></link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Menu;
