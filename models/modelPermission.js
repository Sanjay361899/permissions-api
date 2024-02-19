const mongoose=require("mongoose");
const permission=mongoose.Schema({
    permission_name:{
        type:String,
        required:true
    },
    is_Default:{
        type:Number,
        default:0 //0=>is not default; 1=>is for default
    }
});
module.exports=mongoose.model("permission",permission)