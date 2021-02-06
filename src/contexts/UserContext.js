import React, { createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export class UserProvider extends React.Component {
    state = {
        user: {}
    }

    setUser = (user) => {
        console.log('setUser', user)
        this.setState({ user: user })
    }

    updateUser = (user) => {
        console.log('updateUser', user)
        this.setState((prevState) => ({ user: {...prevState.user, ...user }}))
    }

    componentDidMount = () => {
        // get user data here if user id is set in localStorage
        //console.log('user provider renders', Cookies.get('connect.sid'))
        let userId = localStorage.getItem('userId')
        if(userId !== undefined){
            //console.log('will get user info')
            axios.get(`http://localhost:4000/users/${userId}`)
                .then((res) => {
                    this.setUser(res.data)
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        }
    }

    render(){
        return (
            <UserContext.Provider value={{ user: this.state.user, setUser: this.setUser, updateUser: this.updateUser }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
  
}

