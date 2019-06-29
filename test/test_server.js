var expect = require('chai').expect;
var io = require('socket.io-client'),
  server = require('../server');

/* Note durring testing server doesn't restart */
describe('Basic server testing', function () {

  var client1;
  var client2;
  var client3;
  var socketURL = 'http://localhost:8080';
  var options = {
    'reconnection delay': 0
    , 'reopen delay': 0
    , 'force new connection': true
    , transports: ['websocket']
  };

  /* Test1 
   * Given there are no clients
   * When client1 and client2 connect
   * Then Default usernames shall be broadcasted */

  it('should broadcast default username once someone joins', function (done) {
    var msgCount = 0;
    var checkMessage = function (user, text, msg, client) {
      expect(text).to.equal(msg.text);
      expect(user).to.equal(msg.user);
      client.disconnect();
      msgCount++;
      if (msgCount == 2) {
        done();
      }
    }
    client1 = io.connect(socketURL, options);
    client1.on('connect', function (data) {

      client1.on('chat_msg', function (msg) {
        checkMessage('Server', 'Anonymus1 joined', msg, client1)
      });
      client2 = io.connect(socketURL, options);
      client2.on('connect', function (msg) {
        client2.on('chat_msg', function (msg) {
          checkMessage('Server', 'Anonymus2 joined', msg, client2)
        });
      });
    });
  });

  /* Test2 
   * Given clien1, client2 and client3 are connected
   * When client2 sends a message
   * Then cleint1 and client2 shall recieve it */

  it('should broadcast messages to all members', function (done) {
    var checkMessage = function (user, text, client) {
      client.on('chat_msg', function (msg) {
        msgCount++;
        //First 3 messages are the broadcast of the default usernames -> see Test1
        if (msgCount > 3) {
          expect(text).to.equal(msg.text);
          expect(user).to.equal(msg.user);
          client.disconnect();
        }
        if (msgCount == 6)
          done();
      });
    }

    var msgCount = 0;
    var message = { user: 'Anonymus3', text: 'Hi everyone' };

    client1 = io.connect(socketURL, options);
    client1.on('connect', function (data) {
      client2 = io.connect(socketURL, options);
      client2.on('connect', function (data) {
        client3 = io.connect(socketURL, options);
        client3.on('connect', function (data) {
          client2.emit('chat_msg', message)
          checkMessage("Anonymus3", "Hi everyone", client1);
          checkMessage("Anonymus3", "Hi everyone", client2);
          checkMessage("Anonymus3", "Hi everyone", client3);
        });
      });
    });
  });

  /* Test3 
   * Given client1 and client2 are connected
   * When client2 disconnects
   * Then client1 shall be notified */

  it('should broadcast user who disconnects', function (done) {
    var msgCount = 0;
    var checkMessage = function (user, text, client) {
      client.on('chat_msg', function (msg) {
        msgCount++;
        //First 2 messages are the broadcast of the default usernames -> see Test1
        if (msgCount == 3) {
          expect(text).to.equal(msg.text);
          expect(user).to.equal(msg.user);
          client.disconnect();
          done();
        }
      });
    }
    client1 = io.connect(socketURL, options);
    client1.on('connect', function (data) {

      client2 = io.connect(socketURL, options);
      client2.on('connect', function (msg) {
        client2.disconnect();
      });
      checkMessage("Server", "Anonymus7 disconnected", client1);
    });
  });

  /* Test4 
   * Given client1 and client2 are connected
   * When client2 changes username
   * Then client1 shall be notified with new online usernames */

  it('should broadcast usernames once a username is updated', function (done) {
    var onlineUserCount = 0;
    var expectedUsers = [ 'Anonymus8', 'Johsh' ];

    var chekcOnlineUsers = function (client) {
      client.on('refresh_users', function (users) {
        console.log(users)
        onlineUserCount++;
        if (onlineUserCount == 6) { // #Issue3
          expect(expectedUsers).to.eql(users);
          client.disconnect();
          done();
        }
      });
    }
    client1 = io.connect(socketURL, options);
    client1.on('connect', function (data) {
      chekcOnlineUsers(client1);

      client2 = io.connect(socketURL, options);
      client2.on('connect', function (msg) {
        client2.emit('register_user', 'Johsh');
        client2.disconnect();
      });
    });
  });
});