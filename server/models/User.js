const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Customer","Transporter"],
        required:true
    },
    active: {
        type: Boolean,
        default: true,
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"order"
        }
    ],
    token:{
        type:String
    },
},
{ timestamps: true }
)

module.exports = mongoose.model("user",userSchema);