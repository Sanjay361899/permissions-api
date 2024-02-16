const express=require("express")
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/permission");
const app=express();
const user_routes=require("./routes/userRoutes.js")
const port=process.env.Port
require("dotenv/config.js")
app.use("/",user_routes);
app.listen(2000,()=>{
    console.log(`Server is running on ${process.env.Port}`);
})