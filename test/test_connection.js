var expect = require('chai').expect;
var io = require('socket.io-client'),
  server = require('../server');

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
/*
  it('should broadcast messages to all members', function (done) {
    var checkMessage = function (user, text, client) {
      client.on('chat_msg', function (msg) {
        console.log(msg.text)
        msgCount++;
        if (msgCount > 2) {
          expect(text).to.equal(msg.text);
          expect(user).to.equal(msg.user);
          client.disconnect();
          if (msgCount == 3) {
            done();
          }
        }
      });
    }

    var msgCount = 0;
    var message = { user: 'Anonymus3', text: 'Hi everyone' };

    client1 = io.connect(socketURL, options);
    client1.on('connect', function (data) {
      checkMessage("Server", "Anonymus1 joined", client1);
      client2 = io.connect(socketURL, options);
      client2.on('connect', function (msg) {
        checkMessage("Server", "Anonymus2 joined", client2);
        client3 = io.connect(socketURL, options);
        client3.on('connect', function (msg) {
          checkMessage("Server", "Anonymus3 joined", client3);
          client2.emit('chat_msg', message)
          checkMessage("Anonymus3", "Hi everyone", client1);
          checkMessage("Anonymus3", "Hi everyone", client2);
          checkMessage("Anonymus3", "Hi everyone", client3);
        });
      });
    });
  });
*/
});