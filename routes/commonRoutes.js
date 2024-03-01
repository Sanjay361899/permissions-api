const express=require("express");
const common_router=express();
common_router.use(express.json());
common_router.use(express.urlencoded({extended:true}))
const validator=require("../helpers/adminValidation.js");
const { auth } = require("../middlewares/auth.js");
const { addCategory, getAllCategories, deleteCategory, updateCategory } = require("../controllers/categoryController.js");
const { addPost, updatePost, deletePost, getPost } = require("../controllers/postController.js");
const { storeRole } = require("../controllers/roleController.js");
const { likeUnlikeVladation, postIdLikeVladation } = require("../helpers/userValidation.js");
const { postLike, postUnlike, postLikeCount } = require("../controllers/likeController.js");
//category
common_router.post('/add-category',auth,validator.categoryAddValidator,addCategory);
common_router.get('/get-category',auth,getAllCategories);
common_router.delete('/delete-category',auth,validator.categoryDeleteValidator,deleteCategory);
common_router.put('/update-category',auth,validator.categoryUpdateValidators,updateCategory);
//post
common_router.post('/add-post',auth,validator.postAddValidators,addPost);
common_router.get('/get-post',auth,getPost);
common_router.put('/update-post',auth,validator.postUpdateValidators,updatePost);
common_router.delete('/delete-post',auth,validator.postDeleteValidators,deletePost);
//role creation
common_router.post("/store-role",auth,validator.storeRoleValidators,storeRole)
//LIKE UNLIKE 
common_router.post("/like",auth,likeUnlikeVladation,postLike)
common_router.post("/unLike",auth,likeUnlikeVladation,postUnlike)
common_router.post("/postCount",auth,postIdLikeVladation,postLikeCount)
//create permission apis 
// common_router,post("/permission",auth)
module.exports=common_router;