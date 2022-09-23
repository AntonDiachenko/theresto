import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
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
  }, []);

  return (
    // d-flex flex-row auction1 container col-6 left mb-5
    <div className="d-flex flex-row bd-highlight mb-3 ">
      <div className="p-2 bd-highlight">
        <div className="row">
          <h2 className="col">Categories:</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="col">Categories:</th>
            </tr>

            {categoryList.map((value, key) => {
              return (
                <tr>
                  <td className="col">
                    <a href="#cat-jump">{value.name}</a>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>

      <div className="p-2">
        <div className="row">
          <h2 className="col" id="cat-jump">
            Categories Name
          </h2>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          {menuList.map((value, key) => {
            return (
              <div class="col">
                <div class="card h-100">
                  <img class="card-img-top" src="..." alt="Card cap" />

                  <div class="card-body">
                    <h5 class="card-title">{value.itemname}</h5>
                    <p class="card-text">{value.description}</p>
                    <p class="card-text">
                      <small class="text-muted">{value.price}</small>
                    </p>
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
