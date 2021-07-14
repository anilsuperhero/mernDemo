import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RoutesPage, RoutesAuth, RoutesUser } from "../Route/route";
const Header = lazy(() => import("./Partial/Header"));
const Footer = lazy(() => import("./Partial/Footer"));
const UserHeader = lazy(() => import("./Partial/UserHeader"));
const UserFooter = lazy(() => import("./Partial/UserFooter"));
const UserSidebar = lazy(() => import("./Partial/UserSidebar"));

const RouteWithHeader = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Header />
          <Component {...props} title={rest.title} />
          <Footer />
        </>
      )}
    />
  );
};

const RouteWithAuth = ({ component: Component, isAuth: auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Redirect to="/user/dashboard" />
        ) : (
          <div className="App opensans-family dark-gray">
            <Header />
            <Component {...props} title={rest.title} />
            <Footer />
          </div>
        )
      }
    />
  );
};

const RouteWithUser = ({ component: Component, isAuth: auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <>
            <UserHeader />
            <div className="backend-page-contant">
              <UserSidebar />
              <Component {...props} title={rest.title} />
            </div>
            <UserFooter />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const Index = (props) => {
  return (
    <Switch>
      {RoutesPage.map((route, index) => (
        <RouteWithHeader
          key={index}
          exact
          path={route.path}
          component={route.component}
          title={route.title}
        />
      ))}
      {RoutesAuth.map((route, index) => (
        <RouteWithAuth
          key={index}
          exact
          path={route.path}
          component={route.component}
          title={route.title}
          isAuth={props.isAuth}
        />
      ))}
      {RoutesUser.map((route, index) => (
        <RouteWithUser
          key={index}
          exact
          path={route.path}
          component={route.component}
          title={route.title}
          isAuth={props.isAuth}
        />
      ))}
      <Redirect to="/404" />
    </Switch>
  );
};

export default Index;
