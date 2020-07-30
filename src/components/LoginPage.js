import React from 'react';

class LoginPage extends React.Component {
    state = {
        username: '',
        password: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (event) => {
        event.preventDefault()
        console.log("logging", this.state.username, " ", this.state.password)
    }

    render(){
        return (
            <div className='container'>
                <h2 className="mt-4">Please login</h2>
                <form onSubmit={ this.login } className="mt-4">
                    <div className="form-group">
                        <label>Username:</label>
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
                        <label>Password:</label>
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
            </div>
        );
    }
  
}

export default LoginPage;
