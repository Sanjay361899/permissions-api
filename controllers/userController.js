const userModel = require("../models/userModel.js");
const bcrypt=require("bcryptjs")
const {validationResult }=require("express-validator")
const secure= async(pass)=>{
    return await bcrypt.hash(pass,10);
}
const register=async(req,res)=>{
    try {
      const result=validationResult(req);
   if(!result.isEmpty()){
    res.status(400).send({success:false,error:result.array()})
   }
      const dataRedundancy= await userModel.find({email:req.body.email});
      if(!dataRedundancy){
        const name= req.body.name;
        const email=req.body.email;
        const password=secure(req.body.password);
        const image=req.file.path;
        const data= await new userModel({
        name,
        email,
        password,
        image
       })
     await data.save();
      res.status(200).send({success:true,msg:"data saved",data})
      }else{
        res.status(200).send({success:false,msg:"email is already existing."})
      }  
    } catch (error) {
        res.status(400).send({msg:error.message,success:false});
    }
}
module.exports={
    register
}