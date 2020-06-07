const express = require('express');
const app = express();
const server = app.listen(3010);
const io = require('socket.io')(server);
let clients = [];
let messageList = [];


io.on('connection', (socket) => {
    clients.push(socket);
    socket.emit('messageList', messageList);
    socket.on('onMessage', data => {
        messageList.push({
            message:data.message,
            senderId: socket.id
        });
        clients.map((cl)=> cl.emit('messageList', messageList))

    });

    socket.on('disconnect', () => {
        clients = clients.filter((client, index) => client.id !== socket.id);
    });
});
