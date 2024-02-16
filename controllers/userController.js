const userModel = require("../models/userModel.js");
const bcrypt=require("bcryptjs")
const {validationResult }=require("express-validator")
const jwt=require("jsonwebtoken")



const secure= async(pass)=>{
    return await bcrypt.hash(pass,10);
}

const makeJwt=async(data)=>{
  const jwt_sign=process.env.jwt_secret_key
const token =jwt.sign(data,jwt_sign);
return token;

}


const register=async(req,res)=>{
    try {
      const result=validationResult(req);
   if(!result.isEmpty()){
    res.status(400).send({success:false,error:result.array()})
   }
      const dataRedundancy= await userModel.find({email:req.body.email});
      if(!dataRedundancy.length){
        const name= req.body.name;
        const email=req.body.email;
        const password=await secure(req.body.password);
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
const login=async(req,res)=>{
  try {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).send({success:false,error:errors.array()});
    }
    const userData= await userModel.findOne({email:req.body.email})
    console.log(userData,"user data");
    if(userData){
     const isMatched=await bcrypt.compare(req.body.password,userData?.password);
     if(isMatched){
      const reToken=await makeJwt(userData?.email);
      res.status(200).send({success:true,data:userData,token:reToken});
     }else{
      res.status(200).send({success:false,msg:"password is incorrect of email entered."})
     } 
    }else{
      res.status(200).send({success:false,message:"email doesn't exist."})
    }
  } catch (error) {
      res.status(400).send({success:false,message:error.message});    
  }
}
module.exports={
    register,
    login
}