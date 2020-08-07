import React from 'react';
import Analyzer from './components/Analyzer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import { UserProvider, UserContext } from './contexts/UserContext.js';

class App extends React.Component {
  static contextType = UserContext

  state = {
    loggedIn: this.context.user.username !== undefined
  }

  enter = () => {
    console.log("entered the page")
    this.setState({ onion: 1 })
  }

  leave = () => {
    console.log("leaving the page")
    this.setState({ onion: 2 })
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
          <Route path="/register" component={ RegisterPage } />
        </UserProvider>
      </Router>

    );
  }
  
}

export default App;
