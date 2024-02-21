const categoryModel = require("../models/categoryModel")

const addCategory=async(req,res)=>{
    try {
       const isCategoryExisting= await categoryModel.findOne({
          name:{
            $regex:req.body.category_name,
            $options:'i'
          }  
        })
        if(isCategoryExisting){
            res.status(200).send({success:false,message:"category is existing."})
        }
        const data= new categoryModel({
            name: req.body.category_name,
        });
        await data.save()

        res.status(200).send({success:true,message:"category have been added", data})
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
module.exports={
    addCategory
}