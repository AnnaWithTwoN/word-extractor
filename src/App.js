import React from 'react';
import Analyzer from './components/Analyzer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AboutPage from './components/AboutPage';
import Logout from './components/Logout';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import { UserProvider, UserContext } from './contexts/UserContext.js';

class App extends React.Component {
  static contextType = UserContext

  enter = () => {
    console.log("entered the page")
  }

  leave = () => {
    console.log("leaving the page")
  }

  render(){
    return (
      <Router>
        <UserProvider>
          <Navbar />
          <Route exact 
            path="/" 
            onEnter={ () => console.log("entering the page")}
            onLeave={ () => console.log("leaving the page") }
            render={ props => (
              <div className='container'>
                <Analyzer />
              </div>
            )} />
          <Route path="/profile" component={ Profile } />
          <Route path="/login" render={props => (
            <LoginPage history={ props.history } />
          )} />
          <Route path="/logout" render={props => (
            <Logout history={ props.history } />
          )} />
          <Route path="/register" component={ RegisterPage } />
          <Route path="/about" component={ AboutPage } />
        </UserProvider>
      </Router>

    );
  }
  
}

export default App;
