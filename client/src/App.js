import React, { Component } from 'react';
import './App.css';
import Messages from './Components/Messages/Messages';
import Input from './Components/Input/Input'
import User from './Components/User/User'
import socketIOClient from 'socket.io-client';
import OnlineUsers from './Components/OnlineUsers/OnlineUsers';

const socket = socketIOClient("http://127.0.0.1:8080");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message:"",
      messages: [],
      onlineUsers: []
    };
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  render() {
    return (
      <div className="ChatApp">
        <div className="User-Information">
          <label>Username:</label>
          <Input id="input-username" onSendMessage={this.onUpdateUserName} placeholder={"Enter username"} buttonText={"Save"} name="username"/>
          <User user={this.state.user} />
          <OnlineUsers users={this.state.onlineUsers} />
        </div>
        <div className="Messages">
          <Messages messages={this.state.messages} />
          <Input id="input-message" onSendMessage={this.onSendMessage} placeholder={"Write message"} buttonText={"Send"} name="message"/>
        </div>
      </div>
    );
  }

  componentDidMount() {

    socket.on('chat_msg', (message) => {
      const messages = this.state.messages
      messages.push(message)
      this.setState({ messages: messages })
    });

    socket.on('update_username', (username) => {
      this.setState({ user: username })
    });

    socket.on('load_message_history', (messageHistory) => {
      /* this.setState({ messages: messageHistory }) */
    });

    socket.on('refresh_users', (_onlineUsers) => {
      const currentOnlineUsers = _onlineUsers.map((value) => value);
      this.setState({ onlineUsers: currentOnlineUsers });
    });
  }

  onSendMessage = (text) => {
    const message = { text: text, user: this.state.user }
    socket.emit('chat_msg', message);
  }
  
  onUpdateUserName = (username) => {
    this.setState({ user: username });
    socket.emit('register_user', username);
  }
}

export default App;
