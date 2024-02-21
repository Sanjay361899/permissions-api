const express=require("express");
const common_router=express();
common_router.use(express.json());
common_router.use(express.urlencoded({extended:true}))
const validator=require("../helpers/adminValidation.js");
const { auth } = require("../middlewares/auth.js");
const { addCategory } = require("../controllers/categoryController.js");
common_router.post('/add-category',auth,validator.categoryAddValidator,addCategory);
module.exports=common_router;