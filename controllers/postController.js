const { validationResult } = require("express-validator");
const postModel = require("../models/postModel")

const addPost= async(req, res)=>{
    try {
        const result=validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send({success:false,error:result.array()})
          }
        else{
            // const data= await postModel.findOne({})
        // if(data){
        //     res.status(200).send({success:false,message:"data is already existing of this post."})
        // }else{
             
        // }
        const {title,description}=req.body;
        var obj={
            title,
            description
        }
        if(req.body.categories){
          obj.categories=req.body.categories
        }
        const postData= new postModel(obj);
       const postSave=await postData.save();
       const postPopulate=await postModel.findOne({_id:postSave._id}).populate('categories');
       res.status(200).send({success:true,message:"data has been saved", data:postPopulate})
    }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const deletePost= async(req,res)=>{
    try {
        const result=validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send({success:false,error:result.array()})
          }else
        {const data = await postModel.findByIdAndDelete({_id:req.body.id});
        res.status(200).send({success:true,message:"post is deleted", data})
    } }catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const getPost=async(req,res)=>{
 try {
    const data= await postModel.find({});
    res.status(200).send({success:true,data})
 } catch (error) {
    res.status(400).send({success:false,message:error.message});
 }
}
const updatePost= async(req,res)=>{
    try {
        const result=validationResult(req);
        
        if(!result.isEmpty()){
            res.status(400).send({success:false,error:result.array()})
          }else
        {
        const {title, description}=req.body;
        var obj={
            title,
            description
        }
        if(req.body.categories){
             obj.categories=req.body.categories;
        }
        const data = await postModel.findByIdAndUpdate({_id:req.body.id},{$set:obj},{new:true});
        res.status(200).send({success:true,message:"post is updated", data})
    } }catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
module.exports={addPost,deletePost,updatePost,getPost}