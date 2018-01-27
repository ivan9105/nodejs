let io = require('socket.io').listen(8085);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    let ID = (socket.id).toString().substr(0, 5);
    let time = (new Date).toLocaleTimeString();
    socket.json.send({'event': 'connected', 'name': ID, 'time': time});
    socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
    socket.on('message', function (message) {
        let time = (new Date).toLocaleTimeString();
        socket.json.send({'event': 'messageSent', 'name': ID, 'text': message, 'time': time});
        socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': message, 'time': time});
    });

    socket.on('disconnect', function() {
        let time = (new Date).toLocaleTimeString();
        io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
    });
});