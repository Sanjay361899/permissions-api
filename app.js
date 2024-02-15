const express=require("express")
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/permission");
const app=express();
const user_routes=require("./routes/userRoutes.js")
app.use("/",user_routes);
app.listen(2000,()=>{
    console.log("Server is running");
})