var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

var users = {};
var usersTyping = [];
var messageHistory = [];
var anonymusUserCount = 0;

/* app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}); */

io.on('connection', function (client) {

    initializeConnection(client);

    client.on('register_user', function (newName) {
        handleRegister(newName, client);
    });

    client.on('disconnect', function () {
        handleDisconnect(client);
    });

    client.on('typing', function(isUserTyping) {
        handleTyping(isUserTyping, client);
    });

    client.on('chat_msg', handleMessage);

    console.log('a user connected', client.id);

    io.emit('load_message_history', messageHistory);

    io.emit('refresh_users', getOnlineUsers());

});

function initializeConnection(client) {
    anonymusUserCount++;
    var name = 'Anonymus' + anonymusUserCount;
    handleRegister(name, client);
    client.emit('update_username', client.user_name);
}

var handleRegister = function (newName, client) {
    var textMessage;
    if(!client.user_name) {
        textMessage = newName + ' joined';
    } else {
        textMessage = client.user_name + ' changed user name to ' + newName;
    }

    var message = {user:'Server', text: textMessage};
    client.user_name = newName;
    users[client.id] = client.user_name;

    console.log(textMessage);
    messageHistory.push(message);
    io.emit('refresh_users', getOnlineUsers());
    io.emit('chat_msg', message);
}

var handleMessage = function (message) {
    var msg = message.user + ': ' + message.text;
    console.log('message: ' + msg);
    messageHistory.push(message);
    io.emit('chat_msg', message);
}


var handleTyping = function(isUserTyping, client) {
    if(isUserTyping) {
        usersTyping.push(client.user_name);
    } else {
        var index = usersTyping.indexOf(client.user_name);
        usersTyping.splice(index, 1);
    }

    io.emit('typing', usersTyping);
}

function handleDisconnect(client) {
    var text = client.user_name + ' disconnected';
    var message = {user: 'Server', text: text};
    delete users[client.id];
    messageHistory.push(message);
    io.emit('refresh_users', getOnlineUsers());
    io.emit('chat_msg', message);
}

function getOnlineUsers() {
    return  Object.keys(users).map(function(key) {
        return  users[key];
    });
}
http.listen(8080, function () {
    console.log('Server started');
});