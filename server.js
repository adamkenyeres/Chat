var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

var users = [];

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(client) {
    
    client.on('register_user', handleRegister);
    
    client.on('chat_msg', handleMessage);
    
    client.on('update_user',  handleUpdateUser);
    
    console.log('a user connected', client.id);
    
    client.on('disconect', function() {
        console.log('a user disconected');
    });

    io.emit('refresh_users', users);
});

var handleRegister = function register(username){
    console.log('asd');
     if(users.indexOf(username) <= -1) {
        users.push(username);
        io.emit('refresh_users', users);
    } else {
        io.emit('server_error', 'Username taken');
    }
    users.forEach(function(item) {
        console.log(item);
    }) 
}

var handleMessage = function (username, msg) {
    var message = username + ': ' + msg;
    console.log('message: ' + message);
    io.emit('chat_msg', message);
}

var handleUpdateUser = function() {
    var userid = users.indexOf(username);
    if(userid <= -1) {
        io.emit('server_error', 'Error with username');
    } else {
        users[userid] = newuser;
        io.emit('refresh_users', users);
    }
}

http.listen(8080, function(){
    console.log('Server started');
});