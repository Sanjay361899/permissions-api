const { validationResult } = require("express-validator")
const categoryModel = require("../models/categoryModel")

const addCategory=async(req,res)=>{
    try {
        const result=validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send({success:false,error:result.array()})
          }else{
        const isCategoryExisting= await categoryModel.findOne({
          name:{
            $regex:req.body.category_name,
            $options:'i'
          }  
        })
        if(isCategoryExisting){
            res.status(200).send({success:false,message:"category is existing."})
        }else{
            const data= new categoryModel({
                name: req.body.category_name,
            });
            await data.save()
    
            res.status(200).send({success:true,message:"category have been added", data})
        }}
       
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const getAllCategories=async(req,res)=>{
    try {
        
        const data= await categoryModel.find();
        res.status(200).send({success:false,message:"data is fetched successfully.",data});
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const deleteCategory=async(req,res)=>{
    try {const result=validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send({success:false,error:result.array()})
          }
        else{const data=await categoryModel.findByIdAndDelete({_id:req.body.id})
        res.status(200).send({success:true,message:"data is deleted successfully",data})
    }} catch (error) {
        res.status(400).send({success:false,message:error.message})
        
    }
}
const updateCategory=async(req,res)=>{
    try {
        const result=validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send({success:false,error:result.array()})
          }

       else{const isIdExisting= await categoryModel.findOne({_id:req.body.id})
       if(!isIdExisting){
        res.status(200).send({success:false,message:"id is not there"})
       }else{
        const isNameExisting= await categoryModel.findOne({
            _id:{$ne:req.body.id},
            name:{
                $regex:req.body.category_name,
                $options:'i'
            }
        })
        if(!isNameExisting){
          const data=await categoryModel.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.category_name}},{new:true})
        res.status(200).send({success:true,message:"updation is done on id of category." ,data})
        }else{
        res.status(400).send({success:false,message:"updation is not done on id of category as name is already existing."})
        }
       }}
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
module.exports={
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
}