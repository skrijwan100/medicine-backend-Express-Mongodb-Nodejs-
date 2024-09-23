const mongoose = require("mongoose")
const { Schema } = mongoose;

const bookdoctor= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    dname:{
       type:String,
       require:true
    },
    doctorspiclity:{
        type:String,
       require:true
    },
    dcotorfees:{
      type:Number,
      require:true
    }
})

module.exports=mongoose.model('Booking',bookdoctor)