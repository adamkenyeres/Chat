import React, { Component } from 'react';
import './User.css'
class User extends Component {
    render() {
        const { user } = this.props;
        return (
            <h3 id="user">Your username is: {user} </h3>
        );
    }
}

export default User;
