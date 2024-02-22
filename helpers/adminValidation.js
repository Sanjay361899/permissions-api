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
exports.categoryDeleteValidator=[
    check("id","you have to enter the category id.").not().isEmpty(),
]
exports.categoryUpdateValidators=[
    check("id","you have to enter the category id.").not().isEmpty(),
    check("category_name","you have to enter the category name.").not().isEmpty()
]
exports.postAddValidators=[
    check("title","you have to enter the title.").not().isEmpty(),
    check("description","you have to enter the description").not().isEmpty()
]
exports.postUpdateValidators=[
    check("title","you have to enter the title.").not().isEmpty(),
    check("description","you have to enter the description").not().isEmpty()
]
exports.postDeleteValidators=[
    check("id","you have to enter the id.").not().isEmpty(),
]