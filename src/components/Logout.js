import React from 'react';
import { UserContext } from '../contexts/UserContext.js'

export default class Logout extends React.Component {
    static contextType = UserContext

    componentDidMount = () => {
        localStorage.removeItem('userId')
        this.context.setUser({})
        this.props.history.push('/login')
    }

    render() {
        return ''
    }

}