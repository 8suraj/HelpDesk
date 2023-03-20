const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const DB = process.env.MONGO_URL.replace("<PASSWORD>", process.env.PASSWORD);
function startServer() {
  mongoose.connect(DB);
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}
startServer();
