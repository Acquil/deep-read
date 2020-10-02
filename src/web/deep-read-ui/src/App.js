import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import StartDeepRead from './pages/StartDeepRead';
import AboutUs from './pages/AboutUs';

function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/startdeepread' component={StartDeepRead} />
          <Route path='/aboutus' component={AboutUs} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
