import React, { useEffect, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Inventory from "./components/pages/Inventory";
import Development from "./components/pages/dev/Development";
import Items from "./components/pages/items/Items";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/development" component={Development} />
            <Route exact path="/items" component={Items} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
