const express=require("express");

const router=express.Router();

router.post("/signup",(req,res)=>{
    res.send("login Successfull");
})

router.post("/login",(req,res)=>{
    res.send("login successfull");
})

module.exports=router;