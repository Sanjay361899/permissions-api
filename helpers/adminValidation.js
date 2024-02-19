const {check}=require("express-validator");

exports.permissionValidator=[
    check("permission_name","you have to enter the permission name.").not().isEmpty()
]
exports.permissionModelValidators