const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const socket = require("socket.io");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const { socketHandler } = require("./socketHandler/socketHandler");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const DB = process.env.MONGO_URL.replace("<PASSWORD>", process.env.PASSWORD);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
// io.use(socketHandler);
// let onlineUsers = new Map();
io.on("connection", socketHandler);
function startServer() {
  mongoose.connect(DB);
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}
startServer();
