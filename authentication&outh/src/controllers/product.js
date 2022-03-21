
const express = require("express")
const jwt = require('jsonwebtoken');
const authenticate = require("../middlewares/authenticate");
require('dotenv').config()
const Product = require("../model/product")
let router = express.Router()
const authorise = require("../middlewares/authorise")

let generatetoken = (user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)  
}

router.patch("/:id",authenticate,authorise(["admin","seller"]),async(req,res)=>{
     try {
         let product = await Product.findByIdAndUdate(req.params.id,req.body,{new:true})
         return res.status(200).send(product)
     } catch (error) {
        return res.status(400).send({message : error.message})
     }
})
router.post("",authenticate,async(req,res)=>{
     try {
         let product = await Product.create(req.body)
         return res.status(200).send(product)
     } catch (error) {
        return res.status(400).send({message : error.message})
     }
})
   
router.get("",authenticate,async(req,res)=>{
     try {
         let product = await Product.find().lean().exec()
         return res.status(200).send(product)
     } catch (error) {
        return res.status(400).send({message : error.message})
     }
})

router.delete("/:id",authenticate,async(req,res)=>{
    try {
        let product = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).send(product)
    } catch (error) {
       return res.status(400).send({message : error.message})
    }
})   



module.exports = router 
  