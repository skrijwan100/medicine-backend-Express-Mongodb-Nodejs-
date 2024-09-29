const express= require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User=require("../models/User");
const fecthuser= require("../middleware/fecthuser")
JWT_SERECT="ufhg^)#*dfn"

router.post("/register",[
    body('name',"Enter your name").exists(),
    body("email","Enter a valid email.").isEmail(),
    body("address","Enter a valid address").isLength({min:7}),
    body("phone","Enter your phone number").isLength({min:10}),
    body("password","password length must be 5 word").isLength({min:5})
],async(req,res)=>{
  console.log(req.body)
  try {
    
      const {name,email,address,phone,password}=req.body;
      const error=validationResult(req)
      if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
      }
      const validemail= await User.findOne({email})
      if(validemail){
         return res.status(400).json({"massage":"This email is is alredy exists"})
      }
      const salt = await bcrypt.genSalt(12)
      const haspassword =  await bcrypt.hash(password,salt)

    const user= await User({
        name:name,
        email:email,
        address:address,
        phone:phone,
        password:haspassword
    })
    user.save()
    const authtoken=jwt.sign({
  user:user.id
    },JWT_SERECT)
      return res.status(200).json({user:"Successfully",authtoken})
  } catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.")
  }

  
})

router.post("/login",[
    body("email","Enter a valid email.").isEmail(),
    body("password","Enter password").exists()
],async(req,res)=>{
    try {
    const{password,email}=req.body
    const error=validationResult(req)
    if(!error.isEmpty()){
      return res.status(400).json({error:error.array()});
    }
    const find= await User.findOne({email})
    if(!find){
        return res.status(404).json({"massage":"You don't have a accout on this email."})
       
    }
    const chake= await bcrypt.compare(password,find.password)
    if(!chake){
        return res.status(400).json({"massage":"incorrect password."})
    }
    const authtoken= jwt.sign({
        user:find.id
    },JWT_SERECT)
    return res.status(200).json({"massage":"Successfully",authtoken})
} catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.")
        
}

    
})

router.post("/getuser",fecthuser,async (req,res)=>{
  let userid=req.user
  let user=await User.findById(userid).select("-password")
  res.status(200).json({"massage":user})

})

module.exports=router;