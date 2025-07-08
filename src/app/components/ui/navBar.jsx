import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavBar = () => {
  const { currentUser, logOut } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

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

        {/* Desktop Links */}
        <div className="d-none d-lg-flex navbar-nav">
          <NavLink className="nav-link" end to="/">
            Main
          </NavLink>
          {currentUser ? (
            <>
              <NavLink className="nav-link" to={`/users/${currentUser._id}`}>
                {currentUser.name}
              </NavLink>
              <a className="nav-link" role="button" onClick={logOut}>
                Выйти
              </a>
            </>
          ) : (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
          <NavLink className="nav-link" to="/users">
            Пользователи
          </NavLink>
        </div>

        {/* Mobile Dropdown */}
        <div className="d-lg-none" ref={menuRef}>
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          {isOpen && (
            <div className="custom-dropdown-menu">
              <ul className="list-unstyled mb-0">
                <li>
                  <NavLink className="dropdown-item" end to="/">
                    Main
                  </NavLink>
                </li>
                {currentUser ? (
                  <>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/users/${currentUser._id}`}
                      >
                        {currentUser.name}
                      </NavLink>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        role="button"
                        onClick={logOut}
                      >
                        Выйти
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink className="dropdown-item" to="/login">
                      Login
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink className="dropdown-item" to="/users">
                    Пользователи
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
