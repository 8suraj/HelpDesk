const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {raiserRouter} = require('./routers/raiser.router')


const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());


app.use('/raiser',raiserRouter);
app.use('/resolver',raiserRouter);
app.get('/',(req, res)=>{
  res.status(200).json({
    "ad":"adsad",
  })
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;