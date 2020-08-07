const socketIo = require("socket.io");
const ChildCallbacks = require("./ChildCallbacks");
const sockets = (server) => {
  const io = socketIo(server);
  io.on("connect", (socket) => {
    console.log("socket connected");
    new ChildCallbacks(socket);
  });
  io.on("disconnect", () => console.log("socket disconnected"));
};

module.exports = sockets;
