const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const socket = require("socket.io");
dotenv.config({ path: "./config.env" });
const { UserData } = require("../src/utils/utils");
const app = require("./app");
const { socketHandler } = require("./websocket/socketHandler");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const DB = process.env.MONGO_URL.replace("<PASSWORD>", process.env.PASSWORD);

io.use(async(socket, next) => {
 const header = socket.handshake.headers.authorization;
 if(header){
  let data;
  try{data = await UserData(header)}
  catch(err){data = null}
   if (data) {
     return next();
   }
  }
  return next(new Error('authentication error'));
});
socketHandler(io);
function startServer() {
  mongoose.connect(DB);
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}
startServer();

