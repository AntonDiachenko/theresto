import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

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
import Addnewuser from "./pages/Addnewuser";

import { SocialIcon } from "react-social-icons";

import Item from "./pages/Item";

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
    <div className="general-container">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="App">
            <div className="row nav-container">
              <div className="logo-container">
                <h1 id="app-logo">The Resto</h1>
              </div>
              <div className="col nav-links-container">
                {!authState.status ? (
                  <>
                    <ul className="nav justify-content-center">
                      <li className="nav-item top-nav-item">
                        <Link to="/">
                          <a class="nav-link">Home Page</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/menu">
                          <a class="nav-link">Menu</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/contact">
                          <a class="nav-link">Contact</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/login">
                          <a class="nav-link">Login</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/registration">
                          <a class="nav-link">Registration</a>
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : authState.role == "user" ? (
                  <>
                    {/* user */}
                    <ul className="nav justify-content-center">
                      <li className="nav-item top-nav-item">
                        <Link to="/">
                          <a class="nav-link"> Home Page</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/menu">
                          <a class="nav-link">Menu</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/profile">
                          <a class="nav-link">Profile</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/fav">
                          <a class="nav-link">Favorite</a>
                        </Link>
                      </li>
                      <li className="nav-item top-nav-item">
                        <Link to="/cart">
                          <a class="nav-link">Cart</a>
                        </Link>
                      </li>
                      {/* <Link to="/profile"> Profile</Link> */}
                    </ul>
                  </>
                ) : (
                  <>
                    {/* admin */}
                    <div>
                      <ul className="nav justify-content-center">
                        <li className="nav-item top-nav-item">
                          <Link to="/">
                            <a class="nav-link">Home Page</a>
                          </Link>
                        </li>
                        <li className="nav-item top-nav-item">
                          <Link to="/menu">
                            <a class="nav-link">Menu</a>
                          </Link>
                        </li>
                        <li className="nav-item top-nav-item">
                          <Link to="/contact">
                            <a class="nav-link">Contact</a>
                          </Link>
                        </li>
                        <li className="nav-item top-nav-item">
                          <Link to="/usermanage">
                            <a class="nav-link">UserManage</a>
                          </Link>
                        </li>
                        <li className="nav-item top-nav-item">
                          <Link to="/itemmanage">
                            <a class="nav-link">ItemManage</a>
                          </Link>
                        </li>
                        <li className="nav-item top-nav-item">
                          <Link to="/historymanage">
                            <a class="nav-link">HistoryManage</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="welcome-container">
                      <div>
                        <h4><span id="welcome">Welcome</span> {authState.username}</h4>
                      </div>      
                      <div className="logout-btn-container">
                        {authState.status && (
                          <button className="login-button" onClick={logout}>
                            {" "}
                            Logout
                          </button>
                        )}                        
                      </div>                  

                    </div>
                  </>
                )}
              </div>
            </div>

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
              <Route path="/update" element={<Userupdate />} />
              <Route path="/newuser" element={<Addnewuser />} />
              <Route path="/menu/:id" element={<Item />} />
            </Routes>
          </div>

          <div className="footer-container">
            <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
              <div class="col mb-3">
                <h5 class="text-muted">&copy; 2022: The Resto</h5>
              </div>

              <div class="col mb-3">
                <h5>Links</h5>
                <ul class="nav flex-column">
                  <li class="nav-item mb-2 footer-nav-item">
                    <Link to="/">
                      <a class="nav-link p-0 text-muted">Home Page</a>
                    </Link>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <Link to="/menu">
                      <a class="nav-link p-0 text-muted">Menu</a>
                    </Link>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <Link to="/contact">
                      <a class="nav-link p-0 text-muted">Contact</a>
                    </Link>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <Link to="/registration">
                      <a class="nav-link p-0 text-muted">Registration</a>
                    </Link>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <Link to="/login">
                      <a class="nav-link p-0 text-muted">Login</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div class="col mb-3">
                <h5>Other</h5>
                <ul class="nav flex-column">
                  <li class="nav-item mb-2 footer-nav-item">
                    <a href="#" class="nav-link p-0 text-muted">
                      Home
                    </a>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <a href="#" class="nav-link p-0 text-muted">
                      Features
                    </a>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <a href="#" class="nav-link p-0 text-muted">
                      Pricing
                    </a>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <a href="#" class="nav-link p-0 text-muted">
                      FAQs
                    </a>
                  </li>
                  <li class="nav-item mb-2 footer-nav-item">
                    <a href="#" class="nav-link p-0 text-muted">
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div class="col mb-3">
                <h5>Contact Us</h5>
                <span>
                  <SocialIcon url="https://facebook.com" />{" "}
                  <SocialIcon url="https://instagram.com" />{" "}
                  <SocialIcon url="https://twitter.com" />
                </span>
              </div>
            </footer>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
