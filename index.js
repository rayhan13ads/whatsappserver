const express = require("express");
var http = require("http");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());
const routers = require('./routes');
var clients = {};
app.use('/routes',routers);
io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id, "has joined");
  socket.on("signIn", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (message) => {
    console.log(message);
    let targetId = message.targetId;
    if (clients[targetId]) {
      clients[targetId].emit("message", message);
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`server running  ${port}`);
});
