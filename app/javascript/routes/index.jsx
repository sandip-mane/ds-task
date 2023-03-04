import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./constants";
import Dashboard from "../components/Dashboard";
import AuthLogin from "../components/Auth/Login";
import AuthRegister from "../components/Auth/Register";

export default (
  <Router>
    <Routes>
      <Route path={routes.DASHBOARD_PATH} element={<Dashboard />} />
      <Route path={routes.LOGIN_PATH} element={<AuthLogin />} />
      <Route path={routes.REGISTER_PATH} element={<AuthRegister />} />
    </Routes>
  </Router>
);
