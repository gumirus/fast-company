import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span
            className="navbar-logo fw-bold d-flex align-items-center"
            style={{
              fontSize: 24,
              letterSpacing: "0.04em",
              color: "#374151"
            }}
          >
            <span className="logo-circle d-flex align-items-center justify-content-center me-2">
              <i
                className="bi bi-lightning-charge-fill"
                style={{ color: "#fbbf24", fontSize: 18 }}
              ></i>
            </span>
            Fast Company
          </span>
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={"collapse navbar-collapse" + (isMenuOpen ? " show" : "")}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                end
                to="/"
              >
                Main
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/users"
              >
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
