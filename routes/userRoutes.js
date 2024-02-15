const express=require("express");
const user_router=express();
user_router.use(express.json());
user_router.use(express.urlencoded({extended:true}))
const userControoler=require("../controllers/userController.js")
const validator=require("../helpers/userValidation.js")
const multer=require("multer");
const path=require("path");
user_router.use(express.static("public"))
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
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
const upload=multer({storage:storage});

user_router.post('/register',upload.single("image"),userControoler.register);
module.exports=user_router;