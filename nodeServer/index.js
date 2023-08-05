const io = require("socket.io")(8000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["x-requested-with", "x-auth-token", "content-type"],
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // console.log('New user', name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id],
    });
  });
});
