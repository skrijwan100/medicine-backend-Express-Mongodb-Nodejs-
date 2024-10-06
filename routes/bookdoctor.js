const express = require("express")
const router= express.Router();
const { body, validationResult } = require('express-validator');
const Booking= require("../models/Booking");
const Doctor= require("../models/Doctor")
const fecthuser = require("../middleware/fecthuser");


router.post("/addbook",[
    body("dname","Enter doctor  name").exists(),
    body("doctorspiclity","Enter doctor spiclity.").exists()
],fecthuser,async(req,res)=>{
    try {
        const{dname,doctorspiclity,patientname,patientage,ImgUrl}=req.body;
        const error=validationResult(req)
        if(!error.isEmpty()){
          return res.status(400).json({error:error.array()});
        }
        const avdoctor= await Doctor.findOne({dname:dname})
        if(avdoctor==null){
            return res.status(404).json({"massage":"NOT FOUND"})
        }
        const dcotorfees= avdoctor.fees
        const booking= await Booking({
            dname,
            doctorspiclity,
            dcotorfees,
            patientname,
            patientage,
            ImgUrl,
            user:req.user
        })
        const savebook= await booking.save();
        
        return res.status(200).json({savebook})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error.");
    }
});

router.post("/fecthbook",fecthuser,async(req,res)=>{
    try {
        
  
    const findbook= await Booking.findOne({user:req.user})
    // console.log(findbook)
    if(findbook==null){
        return res.status(404).json({"message":"NOT FOUND ANY    BOOKING"})
    }
    const findallbook= await Booking.find({user:req.user})

   return res.status(200).json({findallbook})
} catch (error) {
    console.log(error)
    res.status(500).send("Internal server error.");
}
    


})
 router.delete("/deletebooking/:id",fecthuser,async(req,res)=>{
    try {
        
 

    let findbooking= await Booking.findById(req.params.id)
    if(!findbooking){
        return res.status(404).json({"message":"NOT FOUND"})
    }
    
    await Booking.findByIdAndDelete(req.params.id)


    return res.status(200).json({"message":"Suessfully delete.!"})
} catch (error) {
   
    res.status(404).json({"messege":"id is wrong"});
        
}


 })

module.exports=router;