const adminAllowed=async(req,res,next)=>{
    try {
        console.log(req.user,"at admin allowed middleware");
        next()
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error.message,
            errorPosition:"adminAllowed catch"
        })
    }
}
module.exports={adminAllowed}