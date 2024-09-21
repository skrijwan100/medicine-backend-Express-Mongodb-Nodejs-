const express=require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');
const Products=require("../models/Products")
const fecthadmin=require("../middleware/fecthadmin");
router.get("/getallproducts",async (req,res)=>{
    try {
        
    
   let allproducts= await Products.find()
   res.status(200).json({allproducts})
} catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.")
        
}

})
router.post("/addproducts",[
    body("pname","Enter product name").exists(),
    body("ppize","Enter prize").exists(),
    body("pstock","Enter stock").exists(),
    body("pexpiryDate","Enter pexpiryDate").exists(),
    body("pdisc","Enter discription more then 8").isLength({min:8})
],fecthadmin,async(req,res)=>{
    try {
        
  
   const {pname,ppize,pstock,pexpiryDate,pdisc,ImgUrL}=req.body;

   const error=validationResult(req)
   if(!error.isEmpty()){
     return res.status(400).json({error:error.array()});
   }
   const newproducts=  await Products({
    pname,
    ppize,
    pstock,
    pexpiryDate,
    pdisc,
    ImgUrL

   })
 let  saveproducts=await newproducts.save()
  return res.status(200).json({saveproducts})
} catch (error) {
    console.log(error)
    res.status(500).send("intarnal server error.")
        
}
   


})

router.put("/updateproduct/:id",fecthadmin,async (req,res)=>{
    try {
        try {
      
        let products= await Products.findById(req.params.id)
        // if(!products){
           
        // }
              
    } catch (error) {
        return res.status(404).json({"massage":"NOT FOUND"})
    }

        const {pname,ppize,pstock,pexpiryDate,pdisc,ImgUrL}=req.body;
        const updateproduct={}
        if(pname){
            updateproduct.pname=pname;

        }
        if(ppize){
            updateproduct.ppize=ppize
        }
        if(pstock){
            updateproduct.pstock=pstock
        }
        if(pexpiryDate){
            updateproduct.pexpiryDate=pexpiryDate
        }
        if(pdisc){
            updateproduct.pdisc=pdisc
        }
        if(ImgUrL){
            updateproduct.ImgUrL=ImgUrL
        }
      let newproducts= await Products.findByIdAndUpdate(req.params.id,{$set:updateproduct},{new:true})
     return  res.status(200).json({newproducts})

        
        
    } catch (error) {
        console.log(error)
    res.status(500).send("intarnal server error.")
        
    }
})

router.delete("/deleteproduct/:id",fecthadmin,async(req,res)=>{
    try {
      
        let products= await Products.findById(req.params.id)
              
    } catch (error) {
        return res.status(404).json({"massage":"NOT FOUND"})
    }
 await Products.findByIdAndDelete(req.params.id)
   return res.status(200).json({"massage":"suessfully delete."})
})


module.exports=router;