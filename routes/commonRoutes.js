const express=require("express");
const common_router=express();
common_router.use(express.json());
common_router.use(express.urlencoded({extended:true}))
const validator=require("../helpers/adminValidation.js");
const { auth } = require("../middlewares/auth.js");
const { addCategory, getAllCategories, deleteCategory, updateCategory } = require("../controllers/categoryController.js");
const { addPost, updatePost, deletePost } = require("../controllers/postController.js");
//category
common_router.post('/add-category',auth,validator.categoryAddValidator,addCategory);
common_router.get('/get-category',auth,getAllCategories);
common_router.delete('/delete-category',auth,validator.categoryDeleteValidator,deleteCategory);
common_router.put('/update-category',auth,validator.categoryUpdateValidators,updateCategory);
//post
common_router.post('/add-post',auth,validator.postAddValidators,addPost);
common_router.put('/update-post',auth,validator.postUpdateValidators,updatePost);
common_router.delete('/delete-post',auth,validator.postAddValidators,deletePost);
module.exports=common_router;