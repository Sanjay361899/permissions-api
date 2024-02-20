const express=require("express");
const admin_router=express();
admin_router.use(express.json());
admin_router.use(express.urlencoded({extended:true}))
const adminController=require("../controllers/admin/permissionController.js")
const validator=require("../helpers/adminValidation.js");
const { auth } = require("../middlewares/auth.js");
admin_router.post('/add-permission',validator.permissionValidator,adminController.permission);
admin_router.get('/all-permission',auth,adminController.getAllPermission);
admin_router.post('/delete-permission',validator.permissionDeleteValidators,auth,adminController.deletePermission);
admin_router.put('/update-permission',validator.permissionUpdateValidators,auth,adminController.updatePermission);
module.exports=admin_router;