// socketSetup.js

const socketIO = require('socket.io');
const { verifyToken } = require('./utils/security'); // Adjust the path accordingly

function setupSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: '*',
      credentials: true,
      optionsSuccessStatus: 200,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token.replace('Bearer ', '');
    if (token) {
      verifyToken(token, (err, data) => {
        if (err) {
          next(new Error('Invalid token'));
          console.log('Invalid token');
        } else {
          socket.deToken = data.data;
          next();
        }
      });
    } else {
      next(new Error('Invalid token'));
    }
  });

  var users = [];
  io.on('connection', (socket) => {
    users = [
      ...users,
      {
        socketId: socket.id,
        userId: socket.deToken.id,
      },
    ];
    setTimeout(() => io.emit('onlineUsers', users), 1000);

    // socket.on('message', (message) => {
    //   io.emit('message', message);
    // });

    socket.on('disconnect', () => {
      users = users.filter((user) => user.socketId !== socket.id);
      io.emit('onlineUsers', users);
    });
  });

  return io;
}

module.exports = setupSocket;
