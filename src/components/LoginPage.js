import React from 'react';
import axios from 'axios';
import  { UserContext } from '../contexts/UserContext.js'

class LoginPage extends React.Component {
    static contextType = UserContext
    state = {
        username: '',
        password: '',
        sumbitError: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (event) => {
        event.preventDefault()
        console.log("logging", this.state.username, " ", this.state.password)
        // post(url, data, config)
        axios.post('http://localhost:4000/users/login', {
            username: this.state.username,
            password: this.state.password
        }, { withCredentials: true })
        .then(res => {
            console.log(res.data)
            //this is only for time
            //localStorage.setItem('known_words', JSON.stringify(res.data.known_words))
            this.context.setUser(res.data)
            this.setState({ username: '', password: ''})
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err)
            console.log(err.response.data.message)
            this.setState({ sumbitError : err.response.data.message })
        })
    }

    render(){
        return (
            <div className='container'>
                <h2 className="mt-4">Please login</h2>
                <form onSubmit={ this.login } className="mt-4">
                    <div className="form-group">
                        <label>Username: *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter username" 
                            name="username"
                            value={ this.state.username } 
                            onChange={ this.onChange } 
                            required />
                    </div>
                    <div className="form-group">
                        <label>Password: *</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password" 
                            name="password"
                            value={ this.state.password } 
                            onChange={ this.onChange } 
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <span style={{ color: 'red', display: this.state.sumbitError === '' ? 'none' : 'block'}}>
                    { this.state.sumbitError }
                </span>
            </div>
        );
    }
  
}

export default LoginPage;
