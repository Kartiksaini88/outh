let passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');
const User = require("../model/user.model")
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2000/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
    let user = await User.findOne({email:profile?._json?.email}).lean().exec()

    if(!user){
        user = await User.create(
           {
            email:profile._json.email,
            pwd:uuidv4(),
            role:["customer"]
           }
        )
    }
    return cb(null,user)
  }
));
// {   name:{type:String,required:true},
//         email:{type:String,required:true,unique:true},
//         pwd:{type:String,required:true},
//         role : [{type : String}]
//     }
module.exports = passport