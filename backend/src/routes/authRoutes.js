const express=require("express");

const router=express.Router();
const prisma=require("../config/prisma");

const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {
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
});
    

    
router.post("/login",(req,res)=>{
    res.send("login successfull");
})

module.exports=router;