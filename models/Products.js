const mongoose= require("mongoose")
const { Schema } = mongoose;

const newproducts= new Schema({
    pname:{
        type:String,
        require:true,
    },
    ppize:{
        type:Number,
        require:true,
    },
    pstock:{
        type:Number,
        require:true,
    },
    pexpiryDate:{
        type:String,
        require:true
    },
    pdisc:{
        type:String,
        require:true
    },
    ImgUrL:{
        type:String

    }
})
module.exports=mongoose.model('Products',newproducts)