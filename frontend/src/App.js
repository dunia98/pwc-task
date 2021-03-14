import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ProtectedRoute } from "./_helpers/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/login" />
          <Route path="*" component={() => {
            return(
              <div className="text-center">
                <h1>404</h1>
                NOT FOUND<br />
                <Link to="/">Back</Link>
              </div>
            )
          }} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
