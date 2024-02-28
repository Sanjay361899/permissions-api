const { validationResult } = require("express-validator");
const roleModel = require("../models/roleModel.js")

const storeRole=async (req,res)=>{
    try {
        const error=validationResult(req);
        if(!error.isEmpty()){
            res.status(400).send({success:false,message:error.array()})
        }
        const {role_name,value}=req.body
        const isRoleExist= await roleModel.findOne({role_name})
        if(isRoleExist){
            res.status(200).send({success:false,message:"role is already created."})
        } else{
            const roleCreated=await new roleModel({
                role_name,
                value
            });
            const roleSave=await roleCreated.save()
            res.status(200).send({succes:true,message:"Role is created", data : roleSave});
        }
    } catch (error) {
        res.status(400).send({success:false ,message:error.message})
    }
}
module.exports={
    storeRole
}