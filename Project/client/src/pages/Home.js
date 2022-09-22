import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="home-container">
        <h1></h1>
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
