const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const billboardRoutes=require("./routes/billboardRoutes");

const app=express();

app.use(cors());
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/billboard",billboardRoutes);



module.exports=app;

