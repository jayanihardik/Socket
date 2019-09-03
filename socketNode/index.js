var app = require('express')();
var http = require('http').createServer(app);
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const Chat = require("./ChatSchema");
const connect = require("./dbconnection");

app.get('/p', function (req, res) {
    console.log('Call');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('message', function (msg) {
        console.log('message: ', msg);
        io.emit('message', msg);
        socket.broadcast.emit("received", { message: msg  });

        //save chat to the database
        connect.then(db  =>  {
        console.log("connected correctly to the server");
    
        let  chatMessage  =  new Chat({ message: msg, sender: "Anonymous"});
        chatMessage.save();
        });
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});