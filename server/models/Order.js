const mongoose = require("mongoose");

const orderSchema =new mongoose.Schema({
    name: {
        type: String
    },
    Description: {
        type: String
    },
    createdOn:{
        type:Date,
        default:Date.now()
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    weight:{
        type:String,
        required:true,
    },
    Source:{
        type:String,
        required:true,
    },
    Destination:{
        type:String,
        required:true,
    },
    Approved:{
        type: Boolean,
        default: false,
    },
    Status:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Status"
        }
    ],
    DeliveringTime:{
        type:String,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model("order", orderSchema);