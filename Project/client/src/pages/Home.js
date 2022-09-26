import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Menu from "./Menu";

function Home() {
  let navigate = useNavigate();

  return (
    <div>
      <div className="home-container">
        <button
          className="order-now"
          onClick={() => {
            navigate("/menu");
          }}
        >
          Order Now
        </button>
      </div>
      <div className="hours-container">
        <h1>Opening Hours</h1>
        <h4>Mon - Tue - Wed - Thu</h4>
        <h5>8am - 9pm</h5>
        <br />
        <h4>Fri - Sat -Sun</h4>
        <h5>9am - 11pm</h5>
      </div>
    </div>
  );
}

export default Home;
