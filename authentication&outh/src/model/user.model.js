let express = require("express")

let mongoose = require("mongoose")
let bcrypt= require("bcrypt")

let userSchema = new mongoose.Schema(
    {   
        email:{type:String,required:true,unique:true},
        pwd:{type:String,required:true},
        role : [{type : String}]
    },{
        versionKey:false,
        timestamps : true,
    }
)

userSchema.pre("save",function(next){
    let hash = bcrypt.hashSync(this.pwd,5)
    this.pwd = hash
    return next()
})

userSchema.methods.checkpwd=function(pwd){
    return bcrypt.compareSync(pwd,this.pwd)
}
// "1234567"
module.exports = mongoose.model("user",userSchema)