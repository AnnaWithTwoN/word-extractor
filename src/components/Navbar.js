import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.js'

export default class Navbar extends React.Component {
    static contextType = UserContext

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/' className="nav-link" activeClassName="active" exact>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        { this.context.user.username === undefined &&
                        <NavLink to='/login' className="nav-link" activeClassName="active">Login</NavLink> }
                    </li>
                    <li className="nav-item">
                        { this.context.user.username === undefined &&
                        <NavLink to='/register' className="nav-link" activeClassName="active">Register</NavLink> }
                    </li>
                    {/*<li className="nav-item">
                        { this.context.user.username !== undefined && 
                        <NavLink to='/profile' className="nav-link" activeClassName="active">My profile</NavLink> }
                    </li>*/}
                    <li className="nav-item">
                        { this.context.user.username !== undefined &&
                        <NavLink to='/logout' className="nav-link">Logout</NavLink>}
                    </li>
                </ul>
            </nav>
        );
    }
}