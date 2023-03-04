import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./constants/routes";
import Dashboard from "./Dashboard";
import AuthLogin from "./Auth/Login";
import AuthRegister from "./Auth/Register";

export default (
  <Router>
    <Routes>
      <Route path={routes.DASHBOARD_PATH} element={<Dashboard />} />
      <Route path={routes.LOGIN_PATH} element={<AuthLogin />} />
      <Route path={routes.REGISTER_PATH} element={<AuthRegister />} />
    </Routes>
  </Router>
);
