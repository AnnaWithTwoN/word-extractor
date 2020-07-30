import React from 'react';
import Analyzer from './components/Analyzer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';


class App extends React.Component {

  render(){
    return (
      <Router>
        <Route exact path="/" render={ props => (
          <div className='container'>
            <Analyzer />
          </div>
        )} />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
      </Router>
      
    );
  }
  
}

export default App;
