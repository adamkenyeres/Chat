var io = require('socket.io-client');
var io_server = require('socket.io').listen(8080);
var expect = require('chai').expect;

describe('basic socket.io example', function () {

  var client1;
  var client2;

  beforeEach(function (done) {
    // Setup
    client1 = io.connect('http://localhost:8080', {
      'reconnection delay': 0
      , 'reopen delay': 0
      , 'force new connection': true
      , transports: ['websocket']
    });

    client1.on('connect', () => {
      console.log('Client1 connected...');
      done();
    });
  });

  afterEach((done) => {
    // Cleanup
    client1.on('disconnect', () => {
      console.log('Client1 disconnected...');
   });

    if (client1.connected) {
      client1.disconnect();
    }
    
    io_server.close();
    done();
  });

  it('Server should send message', (done) => {
    var message = {user:'Server', text: 'Hi how are you'};
    io_server.emit('chat_msg', message);

    client1.once('chat_msg', (msg) => {
      expect(msg.text).to.equal(message.text);
      expect(msg.user).to.equal(message.user);
    });

    io_server.on('connection', (socket) => {
      expect(socket).to.not.be.null;
    });
    done();
  });

});