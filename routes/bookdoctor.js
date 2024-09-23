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
        const{dname,doctorspiclity}=req.body;
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
            user:req.user
        })
        const savebook= await booking.save();
        
        return res.status(200).json({savebook})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error.");
    }
})


module.exports=router;