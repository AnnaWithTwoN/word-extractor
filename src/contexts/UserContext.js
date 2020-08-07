import React, { createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export class UserProvider extends React.Component {
    state = {
        user: {}
    }

    setUser = (user) => {
        this.setState((prevState) => ({ user: user }))
    }

    render(){
        console.log('user provider renders')
        return (
            <UserContext.Provider value={{ user: this.state.user, setUser: this.setUser }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
  
}

