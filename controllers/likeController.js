const { validationResult } = require("express-validator")
const likeModel = require("../models/likeModel")

const postLike=async(req,res)=>{
    try {
        const error= validationResult(req)
        if(!error.isEmpty()){
            res.status(400).send({success:false,message:error.array()})
        }
          const {user_id,post_id}=req.body
        const isLiked=await likeModel.findOne({user_id,post_id})
        if(isLiked){
            res.status(200).send({success:false,message:"You Have already liked this post."})
        }else{
            const likeData=new likeModel({
                user_id,
                post_id
            })
            const savedLike=await likeData.save();
            res.status(200).send({success:true,message:"post is liked",data:savedLike});
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const postUnlike=async(req,res)=>{
    try {
        const error= validationResult(req)
        if(!error.isEmpty()){
            res.status(400).send({success:false,message:error.array()})
        }
        const {user_id,post_id}=req.body
        const isLiked=await likeModel.findOne({user_id,post_id})
        if(isLiked){
            await likeModel.findByIdAndDelete({_id:isLiked._id})
            res.status(200).send({success:true,message:"post is unliked"})
        }else{
            res.status(200).send({success:false,message:"post is not liked first"});
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const postLikeCount=async(req,res)=>{
    try {
        const {post_id}=req.body
        const postCount=await likeModel.find({post_id}).countDocuments()
        if(postCount){
            res.status(200).send({success:true,message:"post count",data:postCount})
        }else{
            res.status(200).send({success:false,message:"no liked post by this post id."})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
module.exports={
    postLike,
    postUnlike,
    postLikeCount
}