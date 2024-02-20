const permission_model=require("../../models/modelPermission.js")
const {validationResult}=require("express-validator")
const permission=async(req,res)=>{
try {
    const error=validationResult(req);
    if(!error.isEmpty()){
       res.status(400).send({success:false,message:error.array()});
    }
    const {permission_name}=req.body
    const is_existing=await permission_model.findOne({permission_name})
    if(is_existing){
        res.status(200).send({success:false,message:"permission already existing."})
    }
    var obj={
        permission_name
    }
    if(req?.body?.is_Default){
        obj.is_Default=req.body.is_Default;
    }
    const perm=await new permission_model(obj);
    await perm.save();
    res.status(200).send({success:true,msg:"permission is added.",data:perm});
 } catch (error) {
    res.status(400).send({
        success:false,message:error.message
    })
}
}
const getAllPermission=async(req,res)=>{
    try {
        const data= await permission_model.find();
        if(data){
           res.status(200).send({success:true,message:"all permission fetched",data});
        }else{
            res.status(200).send({success:false,message:"no permission is existing."})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const deletePermission=async(req,res)=>{
    try {
        const error=validationResult(req);
        if(!error.isEmpty()){
            res.status(400).send({success:false,message:error.array()})
        }
        const {id}=req.body;
        const data=await permission_model.findByIdAndDelete({_id:id})
        console.log(data,"data is here of delete api.");
        if(data){
            res.status(200).send({success:true,message:"permission is deleted."});
        }else{
            res.status(200).send({succes:false,message:"no such permission with this id is existing."});
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const updatePermission= async(req,res)=>{
try {
    const error=validationResult(req);
    if(!error.isEmpty()) res.status(400).send({success:false,message:error.array()})
    const isExisting=await permission_model.findById({_id:req?.body?.id});
    if(!isExisting){
        res.status(200).send({success:false,message:"id is not there please check it."})
    }
    const isPermissionNameExisting=await permission_model.find({
        _id:{$ne:req.body.id},
        permission_name:req.body.permission_name
    })
    if(isPermissionNameExisting.length){
       res.status(200).send({success:false,message:"permission name is already existing"});
    }
   const updated= await permission_model.findByIdAndUpdate({_id:req.body.id},{$set:{permission_name:req.body.permission_name}},{new:true});
   
   if (!updated) {
    return res.status(404).send({ success: false, message: "Document not found" });
}
   res.status(200).send({success:true,message:"data is updated and here is the updated result"});
} catch (error) {
    res.status(400).send({success:false,message:error.message})
}
}
module.exports={
    permission,
    getAllPermission,
    deletePermission,
    updatePermission
}