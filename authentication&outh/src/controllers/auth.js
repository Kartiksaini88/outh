
let User = require("../model/user.model")

let jwt = require('jsonwebtoken')

require('dotenv').config()

let generatetoken = (user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)  
}

let register = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email})

        if(user){
            return res.status(400).send({message : "Email already exists" })
        }

        user = await User.create(req.body)

        let token = generatetoken(user);

        res.status(200).send({user,token})
    }
    catch(err){
        res.status(400).send({message : err.message})
    }

} 

let login = async(req,res)=>{ 
    try{
        let user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(500).send("Wrong Email and password")
        }

        let pass = await user.checkpwd(req.body.pwd)

        if(!pass){
            return res.status(500).send("Wrong Email and password")
        }

        let token = generatetoken(user);

        return res.status(200).send({user,token})

    }

    catch(err){
        res.status(400).send({message : err.message})
    }

}
module.exports = {register,login,generatetoken}