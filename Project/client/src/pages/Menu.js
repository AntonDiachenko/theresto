import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Menu() {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/Categories").then((response) => {
      setCategoryList(response.data);
    });

    axios.get("http://localhost:3001/Menu").then((response) => {
      setMenuList(response.data);
    });

    // axios.get("http://localhost:3001/Categories/menujoin").then((response) => {
    //   setMenuList(response.data);
    // });
  }, []);

  async function addToCart(id, quantity) {
    try {
      const response = await fetch("http://localhost:3001/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: quantity,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let data = await response.json();
      alert("Item Added To Cart");
      console.log(data);
    } catch (err) {
      alert("Something Went Wrong");
      console.log(err);
    }
  }

  return (
    <div className="d-flex container col-12 my-5">
      <div className="col-3 px-3">
        <table className="table table-hover" name="categories">
          <thead>
            <tr>
              <th
                className="flex-column col-1 menu-item-hover"
                onClick={() => {
                  axios.get(`http://localhost:3001/menu`).then((response) => {
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
                        .get(`http://localhost:3001/menu/byId/${value.id}`)
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
                <div className="card h-100">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{value.itemname}</h5>

                    <p className="card-text">{value.description}</p>
                  </div>
                  <div className="card-footer">
                    <p className="text-muted">${value.price}</p>
                    <button
                      onClick={(e) => addToCart(value.id, 1)}
                      className="btn btn-success btn-sm"
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
    </div>
  );
}

export default Menu;
