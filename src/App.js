import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Graph from './views/Graph'
import Home from './views/Home'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/graph">
          <Graph />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
