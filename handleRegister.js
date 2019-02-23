function handleRegister(username){
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