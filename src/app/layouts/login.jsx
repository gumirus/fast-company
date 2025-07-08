import React from "react";
import { Link, Outlet } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Login;
