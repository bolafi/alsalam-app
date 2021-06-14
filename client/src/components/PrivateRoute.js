import React from "react";
import { Route } from "react-router-dom";
import Banner from "./Banner";

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      render={(props) =>
        loggedIn ? <Component {...rest} {...props} /> : <Banner />
      }
    />
  );
};

export default PrivateRoute;
