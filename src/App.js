import React, { Fragment } from "react";
import Map from "./views/clients/map";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Floodplain from "./views/admin/floodplain";
import Home from "./views/clients/home";
import PrimaryLayout from "./layouts/PrimaryLayout";
import PublicLayout from "./layouts/PublicLayout";
import './App.scss';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props}></Component>
        </Layout>
      )}
    />
  );
};

const App = () => {
  return (
    <Fragment>
      <Router>
        <Route path="/" exact component={Map} />
        <AppRoute path="/home" layout={PublicLayout} component={Home} />
        <AppRoute path="/admin" layout={PrimaryLayout} component={Floodplain} />
      </Router>
    </Fragment>
  );
};

export default App;
