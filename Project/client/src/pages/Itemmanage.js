import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// add hover to table, and overdisplay
function Itemmanage() {
  const [name, setName] = useState("");
  const [listOfMenuitems, setListOfMenuitems] = useState([]);
  const [listOfCategories, setListOfCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/menu`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfMenuitems(response.data);
        });
    }

    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/categories`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfCategories(response.data);
        });
    }
  }, []);

  const NewCategory = () => {
    axios
      .post(
        "http://localhost:3001/categories",
        {
          name: name,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then(() => {
        navigate(0);
      });
  };

  const deleteCategory = (id) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .delete(`http://localhost:3001/categories/delete/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          navigate(0);
        });
    }
  };

  const updateCategory = (id) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .put(
          `http://localhost:3001/categories/update/${id}`,
          {
            name: name,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          navigate(0);
        });
    }
  };

  return (
    <div class="d-flex my-5 mx-5">
      <div class="px-5">
        <div>
          <table class="table table-hover" name="categories">
            <thead>
              <tr>
                <th
                  className="flex-column col-1 item-manage-hover"
                  onClick={() => {
                    axios
                      .get(`http://localhost:3001/menu`, {
                        headers: {
                          accessToken: localStorage.getItem("accessToken"),
                        },
                      })
                      .then((response) => {
                        setListOfMenuitems(response.data);
                      });
                  }}
                >
                  All Categories
                </th>
              </tr>
            </thead>

            {listOfCategories.map((value, key) => {
              return (
                <tbody>
                  <tr>
                    <td
                      className="item-manage-hover"
                      onClick={() => {
                        axios
                          .get(`http://localhost:3001/menu/byId/${value.id}`, {
                            headers: {
                              accessToken: localStorage.getItem("accessToken"),
                            },
                          })
                          .then((response) => {
                            setListOfMenuitems(response.data);
                          });
                      }}
                    >
                      {value.name}
                    </td>
                    <td>
                      <button
                        className="crud-button"
                        onClick={() => {
                          deleteCategory(value.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="crud-button"
                        onClick={() => {
                          updateCategory(value.id);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>

        <div className="new-cat-container">
          <div className="row  ">
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="New Category+"
            ></input>
          </div>
          <div>
            <button type="submit" className="crud-button" onClick={NewCategory}>
              Create New
            </button>
          </div>
        </div>
        <p>
          <i>* Enter category name here to update or create new</i>
        </p>
      </div>

      <div class="flex-grow-1 px-5">
        <div className="row pre-scrollable">
          <h3
            className="col"
            onClick={() => {
              axios
                .get(`http://localhost:3001/menu`, {
                  headers: { accessToken: localStorage.getItem("accessToken") },
                })
                .then((response) => {
                  setListOfMenuitems(response.data);
                });
            }}
          >
            Item List:
          </h3>
          <button
            className="crud-button col-2"
            onClick={() => {
              navigate("/newitem");
            }}
          >
            New Item
          </button>
        </div>

        <table class="table table-hover" name="menuitems">
          <thead>
            <tr>
              <th className="col-1 flex-column">Item Name</th>
              <th className="col-3 flex-column">Description</th>
              <th className="col-1 flex-column">Price</th>
              <th className="col-3 flex-column">Photo URL</th>
              <th className="col-1 flex-column">Photo</th>
            </tr>
          </thead>

          {listOfMenuitems.map((value, key) => {
            return (
              <tbody>
                <tr
                  className="item-manage-hover"
                  onClick={() => {
                    navigate(`/menu/${value.id}`);
                  }}
                >
                  <td className="col-1">{value.itemname}</td>
                  <td className="col-3">{value.description}</td>
                  <td className="col-1">{value.price}</td>
                  <td className="col-3">{value.photoURL}</td>
                  <td className="col-1">
                    <img className="itemListImage" src={value.photoURL}></img>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Itemmanage;
