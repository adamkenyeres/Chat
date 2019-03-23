import React, { Component } from 'react';
import './OnlineUsers.css'

class OnlineUsers extends Component {
    render() {
        const { users } = this.props;
        return (
            <div>
                <h3>The following users are online:</h3>
                <ul className="OnlineUsers-list">
                    {users.map(u => this.renderOnlineUsers(u))}
                </ul>

            </div>
        );
    }
    
    renderOnlineUsers(user) {
        return (
            <li className="OnlineUser">
                <div className="OnlineUser-content">
                    <div className="OnlineUser-username">
                        {user}
                    </div>
                </div>
            </li>
        );
    }
}

export default OnlineUsers;
