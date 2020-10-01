import React from "react";
import Map from "./views/clients/map";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./views/admin/Dashboard";

const App = () => {
  return (
    <div>
      {/* <Map /> */}
      <Router>
        <Route path="/" exact component={Map} />
        <Route path="/admin" component={Dashboard} />
      </Router>
    </div>
  );
};

export default App;
