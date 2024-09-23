const mongoose = require("mongoose")
const { Schema } = mongoose;
const Doctor=new Schema({
    dname:{
        type:String,
        require:true
    },
    doctorspiclity:{
        type:String,
        require:true
    },
    availabletime:{
        type:String,
        require:true,
    },
    fees:{
        type:Number,
        require:true,
    }
})
module.exports=mongoose.model('Doctor',Doctor);