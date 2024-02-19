const express=require("express")
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/permission");
require("dotenv/config.js")
const app=express();
const port=process.env.Port

const user_routes=require("./routes/userRoutes.js")
app.use("/",user_routes);

const admin_routes=require("./routes/adminRoutes.js")
app.use("/",admin_routes)

app.listen(2000,()=>{
    console.log(`Server is running on ${port}`);
})