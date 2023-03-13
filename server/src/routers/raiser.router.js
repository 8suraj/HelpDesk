const express = require('express')

const raiserRouter = express.Router()
raiserRouter.get('/',(req, res)=>{
    console.log("asdasdsadas")
    res.status(200).json({
      "ad":"asdasdsseeeeeeeeeee",
    })
  })
raiserRouter.get('/')

module.exports ={raiserRouter}
