const permission_model=require("../../models/modelPermission.js")
const {validationResult}=require("express-validator")
const permission=async(req,res)=>{
try {
    const error=validationResult(req);
    if(!error.isEmpty()){
       res.status(400).send({success:false,message:error.array()});
    }
    const {permission_name}=req.body
    const is_existing=permission_model.findOne({permission_name})
    if(is_existing){
        res.status(200).send({success:false,message:"permission already existing."})
    }
    var obj={
        permission_name
    }
    if(req?.body?.is_Default){
        obj.is_Default=req.body.is_Default;
    }
    const perm=new permission_model(obj);
    const res=await perm.save();
    res.status(200).send({success:true,msg:"permission is added.",data:res});
 } catch (error) {
    res.status(400).send({
        success:false,message:error.message
    })
}
}
module.exports={
    permission
}