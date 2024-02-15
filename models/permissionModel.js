const { default: mongoose } = require("mongoose");

const permissionSchema= new mongoose.Schema({
user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
},
permission:[{
    permission_name:{
        type:String,
    },
    permission_value:{
        type:[Number] //0=>CREATE,1=>READ,2=>EDIT,3=>DELETE
    }
}]
})
module.exports=mongoose.model('Permission',permissionSchema)

