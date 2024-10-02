const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fecthuser = require("../middleware/fecthuser")
const Order = require("../models/Order")
const Product = require("../models/Products")

router.post("/addorder", fecthuser, [
    body("products","Enter product name").exists(),
    body("quantity","Enter quantity ").exists()
], async (req, res) => {
    try {
        const { products,quantity } = req.body;
        const error=validationResult(req)
        if(!error.isEmpty()){
          return res.status(400).json({error:error.array()});
        }
        let productfind = await Product.findOne({ pname: products })
        if (!productfind) {
            return res.status(404).json({ "message": "Product NOT FOUND" });
          }
        console.log(productfind.ppize)
        const ImgUrL=productfind.ImgUrL
        let totalAmount=0;
        totalAmount+=quantity*Number.parseInt(productfind.ppize)
        console.log(totalAmount)
        // console.log(req.user)
        const neworder = await Order({
            products,
            totalAmount,
            quantity,
            ImgUrL,
            user: req.user

        })
        let saveorder = await neworder.save()
        return res.json({ saveorder })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error.");
    }


})

router.post("/fecthorder",fecthuser,async(req,res)=>{
    try {
       let oneorder= await Order.findOne({user:req.user})
       if(oneorder==null){
           return res.status(404).json({"massage":"No order found"})
    }
    let allorder= await Order.find({user:req.user})
    
   return res.status(200).json({allorder})
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error.");
        
    }
    

})

router.delete("/deleteorder/:id",fecthuser,async(req,res)=>{
    try {
        let findorder= await Order.findById(req.params.id)
        if(!findorder){
            return res.status(404).json({"Massage":"NOT FOUND"})
        }
        let finduer= await Order.findOne({user:req.user})
        if(finduer.user==req.user){
            await Order.findByIdAndDelete(req.params.id)
            return res.status(200).json({"massage":"Suessfully delete."})
        }

       return res.status(404).json({"massage":"Not found"})
        
    } catch (error) {
        res.status(500).send("Massage id is wrong");
        
    }
})





module.exports = router;