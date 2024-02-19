const express=require("express");
const admin_router=express();
admin_router.use(express.json());
admin_router.use(express.urlencoded({extended:true}))
const adminController=require("../controllers/admin/permissionController.js")
const validator=require("../helpers/adminValidation.js")
admin_router.post('/add-permission',validator.permissionValidator,adminController.permission);
module.exports=admin_router;