let express = require("express")

let app = express()
let connect = require("./configs/db")
let userController=require("./controllers/user.controller")
let {register,login, generatetoken} = require("./controllers/auth")
app.use(express.json())
let productController = require("./controllers/product")
let passport = require("./configs/google")


app.use("/user",userController)

app.post("/login",login)

app.post("/register",register)
app.use("/product",productController)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get(
  '/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false } ),
  function(req, res) {
   let token = generatetoken(req.user)
   return res.status(200).send({user:req.user, token})
  }
);

app.listen(2000,async()=>{
    try{
      await connect()
      console.log("This is port 2000")  
    }
    catch(err){
      console.log(err)
    }
})