const express = require('express')

const raiserRouter = express.Router()
raiserRouter.get('/',(req, res)=>{
    console.log("asdasdsadas")
    res.status(200).json({
      "ad":"asdasdsseeeeeeeeeee",
    })
  })

module.exports ={ raiserRouter}
