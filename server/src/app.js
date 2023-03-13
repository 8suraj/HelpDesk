const path = require('path');
const express = require('express');
var { expressjwt: jwt } = require("express-jwt");
const cors = require('cors');
const morgan = require('morgan');
const {raiserRouter} = require('./routers/raiser.router')
const {resolverRouter} = require('./routers/resolver.router')
const {authRouter} = require('./routers/auth.router')


const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

app.use('/api/raiser',raiserRouter);
app.use('/api/resolver',resolverRouter);
app.use('/auth',authRouter);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;