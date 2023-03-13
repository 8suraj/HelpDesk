const express = require('express')

const resolverRouter = express.Router()
resolverRouter.get('/',(req, res)=>{
    console.log("asdasdsadas")
    res.status(200).json({
      "ad":"asdasdsseeeeeeeeeee",
    })
  })

module.exports ={ resolverRouter}
