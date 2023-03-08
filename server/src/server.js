const dotenv = require('dotenv')
const http = require('http')
dotenv.config({path:'./config.env'})
const app = require('./app');
const PORT = process.env.PORT || 8000;
console.log(process.env)
const server = http.createServer(app)
server.listen(PORT,()=> console.log(`Listening on port ${PORT}...`)) 