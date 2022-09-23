import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

function Menu() {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="d-flex  container col-12 mb-5">
      <div className="col-3 mx-5">
        <table className="table table-hover" name="categories">
          <thead>
            <tr>
              <th className="flex-column col-1">Categories</th>
            </tr>

            {categoryList.map((value, key) => {
              return (
                <tr>
                  <td
                    className="col-6"
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

      <div className="col-9 mx-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {menuList.map((value, key) => {
            return (
              <div className="col">
                <div className="card h-100">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      {value.itemname}
                    </h5>

                    <p className="card-text">{value.description}</p>
                  </div>
                  <div className="card-footer">
                    <p className="text-muted">${value.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {modalOpen && <Modal setOpenModal={setModalOpen} />}
        </div>

        {/* <table class="table table-hover col-9" name="menuitems">
          <thead>
            <tr>
              <th className="col-1 flex-column">item name</th>
              <th className="col-1 flex-column">description</th>
              <th className="col-1 flex-column">price</th>
              <th className="col-2 flex-column">photoURL</th>
            </tr>

            {menuList.map((value, key) => {
              return (
                <tr>
                  <td className="col-1">{value.itemname}</td>
                  <td className="col-1">{value.description}</td>
                  <td className="col-1">${value.price}</td>
                  <td className="col-2">{value.photoURL}</td>
                </tr>
              );
            })}
          </thead>
        </table> */}
      </div>
    </div>
  );
}

export default Menu;
