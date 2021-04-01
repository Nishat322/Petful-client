import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage.js";
import Pet from "../Pet/Pet";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <Route path={"/adopt"} component={Pet} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App