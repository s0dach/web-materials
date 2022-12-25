import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../../context";

import { privateRoute, publicRoute } from "../../router";

export const AppRouter = () => {
  const { isAuth } = React.useContext(AuthContext);
  return isAuth ? (
    <Switch>
      {privateRoute.map((route) => (
        <Route
          key={route.path}
          component={route.component}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      {publicRoute.map((route) => (
        <Route
          key={route.path}
          component={route.component}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRouter;
