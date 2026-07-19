const express = require("express");

const router = express.Router();
const prisma = require("../config/prisma");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const getMe=async(req,res)=>{
  
  try{
    const user=await prisma.user.findUnique({
      where:{
        id:req.userId,
      },
      select:{
        id:true,
        name:true,
        email:true,
      },
    });
    console.log(user);
    res.json({
      success:true,
      user,
    });
  }catch(error){
    res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}

const signup=async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const login=async (req, res) => {
  try {
    const { email, password } = req.body;
    

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        fullname: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports={
  signup,
  login,
  getMe,
}
