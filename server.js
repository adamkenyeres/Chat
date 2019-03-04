var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

var usernames = {};
var usersTyping = [];
var anonymusUserCount = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

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

    io.emit('refresh_users', usernames);
});

function initializeConnection(client) {
    anonymusUserCount++;
    var name = 'Anonymus' + anonymusUserCount;
    handleRegister(name, client);
    client.emit('update_username', client.user_name);
}

var handleRegister = function (newName, client) {
    var msg;
    if(!client.user_name) {
        msg = newName + ' joined';
    } else {
        msg = client.user_name + ' changed user name to ' + newName;
    }

    client.user_name = newName;
    usernames[client.id] = client.user_name;

    console.log(msg);
    io.emit('refresh_users', usernames);
    io.emit('chat_msg', msg);
}

var handleMessage = function (username, msg) {
    var message = username + ': ' + msg;
    console.log('message: ' + message);
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
    var msg = client.user_name + ' disconnected';
    delete usernames[client.id];
    io.emit('refresh_users', usernames);
    io.emit('chat_msg', msg);
}

http.listen(8080, function () {
    console.log('Server started');
});