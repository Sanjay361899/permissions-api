const express=require("express");
const user_router=express();
user_router.use(express.json());
user_router.use(express.urlencoded({extended:true}))
const userControoler=require("../controllers/userController.js")
const validator=require("../helpers/userValidation.js")
const multer=require("multer");
const path=require("path");
user_router.use(express.static("public"));
const userModel = require("../models/userModel");
const { auth } = require("../middlewares/auth.js");



const checkEmail=async(req,res,next)=>{
    const data=await userModel.findOne({email:req.body.email});
 
    if(data){
       res.status(400).send({success:false,message:"email already existing."});
    }else{
        next();
    }
}

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
            cb(null,path.join(__dirname,"../public/images"),(error,success)=>{
                if(error) throw error;
            });
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname,(error,success)=>{
            if(error) throw error;
        });
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype=="image/jpeg"||file.mimetype=="image/jpg"||file.mimetype=="image/png"){
        cb(null,true);
    }else{
        cb(null,false)
    }
}
const upload=multer({storage:storage,fileFilter});

user_router.post('/register',checkEmail,upload.single("image"),validator.registerValidation,userControoler.register);
user_router.post('/login',validator.loginValidation,userControoler.login);
user_router.post('/profile',validator.profileValidation,auth,userControoler.getPofile);
//updation of user profile is doned here 
user_router.put('/updateUser',auth,userControoler.updateProfile)
user_router.delete('/deleteUser',validator.userDeleteValidation,auth,userControoler.deleteUser)
module.exports=user_router;