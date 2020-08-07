import React from 'react';
import axios from 'axios';

class RegisterPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        pswMatch: true, 
        sumbitError: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    checkPwdMatch = (e) => {
        this.setState({ pswMatch : e.target.value === this.state.password })
        console.log(this.state.pswMatch)
    }

    register = (event) => {
        event.preventDefault()
        console.log("registraing", this.state.username, " ", this.state.password)
        // post(url, data, config)
        axios.post('http://localhost:4000/users', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }, { withCredentials: true })
        .then(res => {
            console.log("success", res.data)
            localStorage.setItem('known_words', JSON.stringify(res.data.known_words))
            this.props.history.push('/login')
        })
        .catch(err => {
            console.log(JSON.stringify(err.response.data.message))
            this.setState({ sumbitError : err.response.data.message })
        })
    }

    render(){
        return (
            <div className='container'>
                <h2 className="mt-4">Create an account</h2>
                <form onSubmit={ this.register } className="mt-4">
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
                        <label>Email:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            name="email"
                            value={ this.state.email } 
                            onChange={ this.onChange } />
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
                    <div className="form-group">
                        <label>Repeat password: *</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Repeat password" 
                            onChange={ this.checkPwdMatch } 
                            required />
                        <span style={{ color: 'red', display: this.state.pswMatch ? 'none' : 'block'}}>Passwords do not match</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    <span style={{ color: 'red', display: this.state.sumbitError === '' ? 'none' : 'block'}}>
                        { this.state.sumbitError }
                    </span>
                </form>
            </div>
        );
    }
  
}

export default RegisterPage;
