import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("login");
  Cookies.remove("access_token");
};

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {Cookies.get("login") ? (
                <a href="/" onClick={logout} className="nav-link">
                  <span className="mr-2">Welcome {Cookies.get("login")}</span>
                  Log Out
                </a>
              ) : (
                <a href="http://localhost:5000/api/login" className="nav-link">
                  Log In
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
