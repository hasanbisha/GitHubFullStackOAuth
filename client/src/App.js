import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import User from "./components/User";
import Nav from "./components/layout/Nav";
import Home from "./components/Home";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import Repositories from "./components/Repositories";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Nav />
          <Switch>
            {Cookies.get("login") ? (
              <Route exact path="/" component={User} />
            ) : (
              <Route exact path="/" component={Home} />
            )}
            <Route exact path="/user/repositories" component={Repositories} />
            <Route exact path="/logout" component={Repositories} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
