const userModel = require("../models/userModel.js");
const bcrypt=require("bcryptjs")
const {validationResult }=require("express-validator")

const jwt=require("jsonwebtoken");
const { sendMail } = require("../helpers/sendMail.js");
const userPermissionModel = require("../models/userPermissionModel.js");
const modelPermission = require("../models/modelPermission.js");
const { default: mongoose } = require("mongoose");
const secure= async(pass)=>{
 return await bcrypt.hash(pass,10);
}

const makeJwt=async(data)=>{
const jwt_sign=process.env.jwt_secret_key
const token =jwt.sign({data},jwt_sign,{ expiresIn: '1h'});
return token;
}


const register=async(req,res)=>{
    try {
      const result= validationResult(req);
     if(!result.isEmpty()){
       res.status(400).send({success:false,error:result.array()})
     }
      const dataRedundancy= await userModel.findOne({email:req.body.email});
      if(!dataRedundancy){
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
      const savedData= await data.save();
      const content = `
     <p> hi <b>`+name+`,</b> Your account is created,below is your details don't share this email with anyone.</p>
     <table style='border-style:none'>
        <tr>
        <th>Name-</th>
        <td>`+name+`</td>
        </tr>
        <tr>
        <th>Email-</th>
        <td>`+email+`</td>
        </tr>
        <tr>
        <th>password-</th>
        <td>`+req.body.password+`</td>
        </tr>
     </table>
     <p>Now you can login into your account with above credentials.</p>
     `
     const permission=await modelPermission.find({is_Default:1})
     if(permission.length>0){
      const permissionData=[];
    await Promise.all(permission.forEach(async element => {
        permissionData.push({
          permission_name:element.permission_name,
          permission_value:[0,1,2,3]
        })
      }));
      await new userPermissionModel({
        user_id:savedData._id,
        permission:permissionData
      }).save();
     }
     await sendMail(req.body.email,`you have been registered to permission website`,content)
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
      const reToken=await makeJwt(userData);
      const result=await userModel.aggregate([
        {
          $match:{email:userData.email}
        },
        {
          $lookup:{
            from:"userpermissions",
            localField:"_id",
            foreignField:"user_id",
            as:"permission"
          }
        },
        {
          $project:{
            _id:0,
            name:1,
            email:1,
            permission:{
              $cond:{
                if:{$isArray:"$permission"},
                then:{$arrayElemAt:["$permission",0]},
                else:null
              }
            }
          }
        },
        {
          $addFields:{
             "permission":{"permission":"$permission.permission"}
          }
        }
      ])
      res.status(200).send({success:true,data:result,token:reToken});
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
const getPofile=async (req,res)=>{
  try {
    const error=validationResult(req);
    if(!error.isEmpty()){
      res.status(400).send({errors:error.array()})
    }
    const {email}=req.body;
    const profileData= await userModel.findOne({email});
    if(profileData){
      const result = await userModel.aggregate([
        {$match:{
           _id:{$ne:new mongoose.Types.ObjectId(profileData._id)} 
        }},{
          $lookup:{
            from:"userpermissions",
            localField:"_id",
            foreignField:"user_id",
            as:"permission"
          }
        },
        {
          $project:{
            _id:0,
            name:1,
            email:1,
            permission:{
              $cond:{
                if:{$isArray:"$permission"},
                then:{$arrayElemAt:["$permission",0]},
                else:null
              }
            }
          }
        },
        {
          $addFields:{
            "permission":{
              "permission":"$permission.permission"
            }
          }
        }
      ])
      res.status(200).send({success:true,message:"all profile  data is fetched", data:result});
    }else{
      res.status(200).send({success:false,message:"there is no such email."})
    }
  } catch (error) {
    res.status(400).send({success:false,message:error.message});
  }
}
const updateProfile=async(req,res)=>{
  try {
    const error=validationResult(req);
    if(!error.isEmpty()){
      res.status(400).send({success:false,message:error.array()})
    }else{
      if(req.body.id){
        const userExist= await userModel.findOne({_id:req.body?.id})
        if(userExist){
          delete req.body.id;
        const updatedData=  await userModel.findByIdAndUpdate({_id:userExist.id},{$set:req.body},{new:true}) 
          res.status(200).send({success:true,message:"profile has been updated successfully", data:updatedData})
        }else{
          res.status(200).send({success:false,message:"profile doesn't exist with this id."})
        }
      }        
    }
  } catch (error) {
    res.status(400).send({success:false,message:error.message})
  }
}
const deleteUser=async(req,res)=>{
  try {
    const error=validationResult(req);
    if(!error.isEmpty()){
      res.status(400).send({success:false,message:error.array()})
    }
    let existingUser= await userModel.findByIdAndDelete({_id:req.body.id})
    if(existingUser){
      res.status(200).send({success:true,message:"user is deleted successfully"});
    }else{
      res.status(200).send({success:false,message:"user is not existing."})
    }
  } catch (error) {
    res.status(400).send({success:false,message:error.message})
  }
}
module.exports={
    register,
    login,
    getPofile,
    updateProfile,
    deleteUser
}