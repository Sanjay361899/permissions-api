const {check}=require("express-validator");

exports.registerValidation=[
    check("name","please fill the name field").not().isEmpty(),
    check("email","please fill the name field").isEmail(),
    check("password","password must be atleat 7 character long and contains 1 small alphabet , 1 numeric, and 1 capital alphabet ").isStrongPassword({
        minLength:7,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
    }),
    check("image").custom((value,{req})=>{
     if(req.file.mimetype=="image/jpeg"||req.file.mimetype=="image/jpg"||req.file.mimetype=="image/png"){
        return true;
     }else{
        return false;
     }
    }).withMessage('image should be of type jpeg ,jpg, png'),
    
]