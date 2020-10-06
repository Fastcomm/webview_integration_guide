const express = require("express");
const app = express();

let broadcaster;
let socketIds = [];
const port = 4000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);
app.use(express.static(__dirname + "/public"));

io.sockets.on("error", e => console.log(e));
io.sockets.on("connection", socket => {
  console.log(socket.id);
  socketIds.push(socket.id);
  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("peerview", () => {
    socket.to(broadcaster).emit("peerview", socket.id);
  });
  socket.on("offerid", (id, message) => {
    socket.to(id).emit("offerid", socket.id, message);
  });
  socket.on("peeranswer", (id, message) => {
    socket.to(id).emit("peeranswer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    console.log(socket.id);
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
    const index = socketIds.indexOf(socket.id);
    if (index > -1) {
      socketIds.splice(index, 1);
    }
    console.log(socketIds);
  });
  socket.on("message", (fromUser, text) => {
    console.log(fromUser, text);
    socket.to(broadcaster).emit('message', fromUser, text);
  })
  socket.on("messageall", (message, type) => {
    console.log(message);
    for (var i = 0; i < socketIds.length; i++)
    {
      console.log("Sending to " + socketIds[i]);
      socket.to(socketIds[i]).emit('messageviewer', message, type);
    }
  })
});

server.listen(port, () => console.log(`Server: ${port}`));
