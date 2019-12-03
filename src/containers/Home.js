import React from 'react';
import logo from '../logo.svg';
import {
    Link
  } from "react-router-dom";
function Home() {
    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Welcome To Dashboard
            </p>
            <Link
                className="App-link"
                to="/graph"
            >
                Synergo Graph
            </Link>
            </header>
        </div>
    );
  }
  
  export default Home;