// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('./modules/admin.js');
const action_center = require('./modules/action_center.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    admin(socket);
    action_center(socket);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
