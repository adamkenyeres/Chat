import React, { Component } from 'react';
import './chatroom.css';

class Chatroom extends Component {
  render() {
    return (
  <table >
    <tr>
      <td width="30%" valign="top">
        <h3 id="user">Your username is: </h3>
        <h3> The following users are online: </h3>
        <ul id="users"></ul>
        <form action="" id="saveusername">
          <label for="username">User Name</label>
          <input id="username" autocomplete="off" placeholder="User name" /><button>save</button>
        </form>
      </td>
      <td width="70%">
        <ul id="messages"></ul>
        <ul id="typing"></ul>
        <form action="" id="sendmsg">
          <label for="message">Write Message</label>
          <input id="msg" autocomplete="off" placeholder="Write message" /><button>Send</button>
        </form>
      </td>
    </tr>
  </table>
    );
  }
}

export default Chatroom;
