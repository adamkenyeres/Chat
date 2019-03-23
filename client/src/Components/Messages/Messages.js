import React, { Component } from 'react';
import './Messages.css'
class Messages extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }
    renderMessage(message) {
        const {user, text} = message;
        return (
            <li className="Messages-message">
                <div className="Message-content">
                    <div className = "message-user">
                        {user}
                    </div>
                    <div className="Message-text">
                        {text}
                    </div>
                </div>
            </li>
        );
    }
}

export default Messages;
