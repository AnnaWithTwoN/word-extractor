import React from 'react';

class RegisterPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        pswMatch: true
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    checkPwdMatch = (e) => {
        this.setState({ pswMatch : e.target.value === this.state.password })
        console.log(this.state.pswMatch)
    }

    login = (event) => {
        event.preventDefault()
        console.log("logging", this.state.username, " ", this.state.password)
    }

    render(){
        return (
            <div className='container'>
                <h2 className="mt-4">Create an account</h2>
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
                </form>
            </div>
        );
    }
  
}

export default RegisterPage;
