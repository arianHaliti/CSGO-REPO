import React, { useEffect, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Inventory from "./components/pages/Inventory";
import Development from "./components/pages/dev/Development";
import Items from "./components/pages/items/Items";
import Alert from "./components/layout/Alert";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";
import FilterItemModal from "./components/pages/items/ItemOptions/FilterItemModal";
// redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <FilterItemModal />
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/inventory" component={Inventory} />
              <Route exact path="/development" component={Development} />
              <Route exact path="/items" component={Items} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
