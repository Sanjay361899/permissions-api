const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        default:0    //0=>Normal user, 1=>admin, 2=>sub-admin, 3=>editor;
    }
})
module.exports = mongoose.model("User",userSchema);