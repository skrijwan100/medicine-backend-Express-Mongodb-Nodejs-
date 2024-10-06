const express= require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');
const Doctor= require("../models/Doctor")
const fecthadmin= require("../middleware/fecthadmin")

router.post("/fecthalldoctor",async (req,res)=>{
    try {
 const alldoctor= await Doctor.find()
   if(alldoctor.length==0){
    return res.status(400).json({"massage":"NO Doctor is  available at this time"})
   }
    res.status(200).json({alldoctor})
} catch (error) {
    console.log(error)
    res.status(500).send("Internal server error.");  
}
});
router.post("/adddoctor",[
    body("dname","Enter doctor name.").exists(),
    body("doctorspiclity","Enter doctor spiclity").exists(),
    body("availabletime","Enter doctor available time.").exists(),
    body("fees","Enter doctor fees.").exists()
],fecthadmin,async (req,res)=>{
    try {
    const {dname,doctorspiclity,availabletime,fees,ImgUrl}=req.body;
    const error=validationResult(req)
    if(!error.isEmpty()){
      return res.status(400).json({error:error.array()});
    }
    const doctor =  await Doctor({
        dname,
        doctorspiclity,
        availabletime,
        fees,
        ImgUrl
    })
const savedoctor= await doctor.save()
    res.status(200).json({savedoctor})
} catch (error) {
    console.log(error)
    res.status(500).send("Internal server error.");
        
}
})

router.put("/updatedoctor/:id",[
    body("dname","Enter doctor name.").exists(),
    body("doctorspiclity","Enter doctor spiclity").exists(),
    body("availabletime","Enter doctor available time.").exists(),
    body("fees","Enter doctor fees.").exists()
],fecthadmin,async(req,res)=>{
    try {
    const {dname,doctorspiclity,availabletime,fees,ImgUrl}=req.body;
    const doctor = await Doctor.findById(req.params.id)
    const updoctor={}
    if(dname){
        updoctor.dname=dname
    }
    if(doctorspiclity){
        updoctor.doctorspiclity=doctorspiclity
    }
    if(availabletime){
        updoctor.availabletime=availabletime
    }
    if(fees){
        updoctor.fees=fees
    }
    if(ImgUrl){
        updoctor.ImgUrl=ImgUrl
    }
    const updatedoctor= await Doctor.findByIdAndUpdate(req.params.id,{$set:updoctor}, {new:true})

    return res.status(200).json({"massage":"update Suessfully",updatedoctor})
 
} catch (error) {
   
    res.status(500).json({"massage":"Internal server error.or id is wrong"});
        
}


})

router.delete("/deletedoctor/:id",fecthadmin,async(req,res)=>{
    try {
        const doctor= await Doctor.findById(req.params.id)
        if(!doctor){
          return  res.status(404).json({"massage":"NOT FOUND"})
        }
        await Doctor.findByIdAndDelete(req.params.id)
        return res.status(200).json({"massage":"Suessfully delete."})
        
    } catch (error) {
        res.status(500).json({"masssage":"The is id wrong"})
        
    }
})


module.exports=router;