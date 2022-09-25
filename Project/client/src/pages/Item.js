import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Item() {
  const { id } = useParams();

  const [menuitem, setMenuitem] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:3001/menu/${id}`).then((response) => {
        setMenuitem(response.data);
      });
    }
  }, []);

  const deleteItem = (id) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .delete(`http://localhost:3001/menu/delete/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          navigate("/itemmanage");
        });
    }
  };

  const initialValues = {
    newitemname: "",
    newdescription: "",
    newprice: "",
    newphotoURL: "",
    newcategotyid: "",
  };

  const onSubmit = (data) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .put(
          `http://localhost:3001/menu/update/${id}`,
          data,

          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          navigate(0);
        });
    }
  };

  const Schema = Yup.object().shape({
    newitemname: Yup.string().required(),
    newdescription: Yup.string().required(),
    newprice: Yup.number().required(),
    newphotoURL: Yup.string(),
    newcategotyid: Yup.number(),
  });

  return (
    <div className="d-flex mx-5 my-5">
      <div class="container col-5 mx-5">
        <h2>Item Info:</h2>
        <div>
          <img src={menuitem.photoURL}></img>          
        </div>
        <div className="input-group mb-1">
          <span class="input-group-text col-3">Item name:</span>
          <div className="form-control col">{menuitem.itemname}</div>
        </div>
        <br></br>
        <div className="input-group mb-1">
          <span class="input-group-text col-3">Description:</span>
          <div className="form-control col">{menuitem.description}</div>
        </div>
        <br></br>
        <div className="input-group my-2">
          <span class="input-group-text col-3">Price:</span>
          <div className="form-control col">{menuitem.price}</div>
        </div>
        <br></br>
        <button
          className="btn btn-danger col-12 my-1"
          onClick={() => {
            deleteItem(menuitem.id);
          }}
        >
          Delete
        </button>
      </div>

      <div className="container col-5 mx-5">
        <h2>Item Update:</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={Schema}
        >
          <Form>
            <div className="row">
              <span className="input-group-text col-3 my-3">ItemName:</span>

              <Field
                name="newitemname"
                placeholder="Please enter your item name."
                className=" col form-control my-3"
              />
              <ErrorMessage name="newitemname" component="span" />
            </div>
            <div className="row">
              <span className="input-group-text col-3 my-3">Description:</span>

              <Field
                name="newdescription"
                className="form-control col my-3"
                placeholder="Please enter your description."
              />
              <ErrorMessage name="newdescription" component="span" />
            </div>
            <div className="row">
              <span className="input-group-text col-3 my-3">Price:</span>

              <Field
                name="newprice"
                className="form-control col my-3"
                placeholder="Please enter your price."
              />
              <ErrorMessage name="newprice" component="span" />
            </div>
            <div className="row">
              <span className="input-group-text col-3 my-3">PhotoURL:</span>

              <Field
                name="newphotoURL"
                className="form-control col my-3"
                placeholder="Please enter your photoURL."
              />
              <ErrorMessage name="newphotoURL" component="span" />
            </div>
            <div className="row">
              <span className="input-group-text col-3 my-3">CategoryId:</span>

              <Field
                name="newcategoryid"
                className="form-control col my-3"
                placeholder="Please enter your newcategoryid."
              />
              <ErrorMessage name="newcategoryid" component="span" />
            </div>
            <br></br>
            <button className="btn btn-success  col-12" type="submit">
              Update
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Item;
