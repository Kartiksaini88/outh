let express = require('express')

let User = require("../model/user.model")

let router = express.Router()


router.get("",async(req,res)=>{
    try{
       let user = await User.find().lean().exec()
      return res.status(200).send({user:user})
    }
    catch(err){
        return res.status(500).send({err:err.message})
    }
})

router.post("",async(req,res)=>{
    try{
       let user = await User.create(req.body)

      return res.status(200).send({user:user})
    }
    catch(err){
        return res.status(500).send({err:err.message})
    }
})

module.exports = router