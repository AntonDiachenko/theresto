import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';

import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./helper/AuthContext";
import { useNavigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Usermanage from "./pages/Usermanage";
import Itemmanage from "./pages/Itemmanage";
import Historymanage from "./pages/Historymanage";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import Userupdate from "./pages/Userupdate";
import Addnewuser from './pages/Addnewuser';

function App() {
  // const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: "",
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, role: "" });
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // setUser(response.data);
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links col-8">
              {!authState.status ? (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/menu"> Menu</Link>
                  <Link to="/contact"> Contact</Link>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : authState.role == "user" ? (
                <>
                  {/* user */}
                  <Link to="/"> Home Page</Link>
                  <Link to="/menu"> Menu</Link>
                  <Link to="/profile"> Profile</Link>
                  <Link to="/fav"> Favorite</Link>
                  <Link to="/cart"> Cart</Link>
                  {/* <Link to="/profile"> Profile</Link> */}
                </>
              ) : (
                <>
                  {/* admin */}
                  <Link to="/"> HomePage</Link>
                  <Link to="/menu"> Menu</Link>
                  <Link to="/contact"> Contact</Link>
                  <Link to="/usermanage"> UserManage</Link>
                  <Link to="/itemmanage"> ItemManage</Link>
                  <Link to="/historymanage"> HistoryManage</Link>
                </>
              )}
              {/* https://getbootstrap.com/docs/4.0/components/navbar/,if we want to add dropdown button, click here */}
            </div>
            <div className="loggedInContainer  col">
              {authState.username}
              {authState.status && (
                <button className="btn btn-outline-warning" onClick={logout}>
                  {" "}
                  Logout
                </button>
              )}
            </div>
          </div>

          <footer class="footer text-center text-red">
            <div class="container p-1 pb-0">
              <section class="mb-2">
                <a
                  class="btn text-red btn-floating m-1"
                  href="#!"
                  role="button"
                >
           
                  facebook
                </a>

                {/* add the icon of facebook */}
                <a
                  class="btn text-red btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-twitter"></i>twitter
                </a>
                <Link className='' to="/login"> Login</Link>
                <a
                  class="btn text-red btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-google"></i>google
                </a>
              </section>
            </div>
            <div>
              © 2020 Copyright:
              <a class="text-red" href="https://mdbootstrap.com/">
                restaurent
              </a>
            </div>
          </footer>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/usermanage" element={<Usermanage />} />
            <Route path="/itemmanage" element={<Itemmanage />} />
            <Route path="/historymanage" element={<Historymanage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/fav" element={<Favorite />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/update/:id" element={<Userupdate />} />
            <Route path="/newuser" element={<Addnewuser />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
