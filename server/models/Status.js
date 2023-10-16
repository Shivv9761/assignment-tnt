const mongoose = require("mongoose");


const StatusSchema =new mongoose.Schema({

  desc:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  time:{
    type:Date,
    default:Date.now(),
  },
  delivered: {
    type: Boolean,
    default: false,
  },
})
module.exports = mongoose.model("Status",StatusSchema);