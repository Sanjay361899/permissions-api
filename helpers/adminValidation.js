const {check}=require("express-validator");

exports.permissionValidator=[
    check("permission_name","you have to enter the permission name.").not().isEmpty()
]
exports.permissionDeleteValidators=[
    check("id","you have to enter the permission id.").not().isEmpty(),
]
exports.permissionUpdateValidators=[
    check("id","you have to enter the permission id.").not().isEmpty(),
    check("permission_name","you have to enter the permission name.").not().isEmpty()
]
exports.categoryAddValidator=[
    check("name","you have to enter the category name.").not().isEmpty()
]