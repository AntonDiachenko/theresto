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
    <div class="d-flex  container col-12 mb-5">
      <div class="col-3 mx-5">
        <table class="table table-hover" name="categories">
          <thead>
            <tr>
              <th
                className="flex-column col-1"
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

            {listOfCategories.map((value, key) => {
              return (
                <tr>
                  <td
                    className="col-6"
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
                  <button
                    className="btn btn-sm  btn-outline-danger col-6"
                    onClick={() => {
                      deleteCategory(value.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm  btn-outline-danger col-6"
                    onClick={() => {
                      updateCategory(value.id);
                    }}
                  >
                    update
                  </button>
                </tr>
              );
            })}

            <tr>
              <div className="row  ">
                <input
                  className="col-6"
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="New Category+"
                ></input>

                <button
                  type="submit"
                  className="btn btn-sm btn-secondary col-6"
                  onClick={NewCategory}
                >
                  New
                </button>
              </div>
            </tr>
          </thead>
        </table>
      </div>

      <div class="col-9 mx-5">
        <div className="row pre-scrollable">
          <h2
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
          </h2>
          <button
            className="btn btn-sm  btn-outline-danger  col-2"
            onClick={() => {
              navigate("/newitem");
            }}
          >
            New Item
          </button>
        </div>

        <table class="table table-hover col-9" name="menuitems">
          <thead>
            <tr>
              <th className="col-1 flex-column">itemname</th>
              <th className="col-1 flex-column">description</th>
              <th className="col-1 flex-column">price</th>
              <th className="col-2 flex-column">photoURL</th>
            </tr>

            {listOfMenuitems.map((value, key) => {
              return (
                <tr
                  onClick={() => {
                    navigate(`/menu/${value.id}`);
                  }}
                >
                  <td className="col-1">{value.itemname}</td>
                  <td className="col-1">{value.description}</td>
                  <td className="col-1">{value.price}</td>
                  <td className="col-2">{value.photoURL}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Itemmanage;
