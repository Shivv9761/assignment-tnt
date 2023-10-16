const express= require("express");
const app=express();


const cookieParser = require("cookie-parser");
const cors= require("cors");
const database = require("./config/database")
const userRoutes = require("./routes/User")
const orderRoutes = require("./routes/Order")
const statusRoutes = require("./routes/Status")

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000 

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"https://tnt-backend-6ljy.onrender.com",
        credentials:true
    })
)
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/status",statusRoutes);
app.get("/", (req,res)=>{
    return res.json({
        succeess:true,
        message:"your server is up and running"
    })
})


app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})
