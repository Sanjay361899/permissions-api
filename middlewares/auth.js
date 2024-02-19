const jwt=require("jsonwebtoken")
const auth=async(req,res,next)=>{
try {
    const token=await req.query.token||req.body.token||req.headers['authorization']
    if(token){
        const decode = jwt.verify(token,process.env.jwt_secret_key)
        console.log(decode,"decode");
        
        // next()
    }else{
        res.status(400).send({success:false ,message:"token is required."})
    }
} catch (error) {
    res.status(400).send({success:false,message:error.message})
}
}
module.exports={auth}