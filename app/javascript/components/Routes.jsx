import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import routes from "./constants/routes";
import Dashboard from "./Dashboard";
import AuthLogin from "./Auth/Login";
import AuthRegister from "./Auth/Register";

import { isLoggedIn } from "../utils/app";

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      isLoggedIn()
        ? <Component {...props} />
        : <Redirect to={routes.auth.login} />
      )}
    />
  );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (
        isLoggedIn() && restricted
          ? <Redirect to={routes.dashboard} />
          : <Component {...props} />
      )}
    />
  );
};

export default (props) => {
  return (
    <Router>
      <PublicRoute exact restricted component={AuthLogin} path={routes.auth.login} />
      <PublicRoute exact restricted component={AuthRegister} path={routes.auth.register} />
      <PrivateRoute exact component={Dashboard} path={routes.dashboard} />
    </Router>
  );
}

