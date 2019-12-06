import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Graph from './containers/Graph'
import Home from './containers/Home'
import LoginForm from './containers/LoginForm'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/graph">
            <Graph />
        </PrivateRoute>
        <Route path="/">
            <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  console.log('private route')
  return (
    <Route 
      {...rest}
      render={({ location }) =>
        localStorage.getItem('auth') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default App;
