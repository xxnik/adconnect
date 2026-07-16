const express = require("express");

const router = express.Router();
const prisma = require("../config/prisma");

const getMyBillboard = async (req, res) => {
  try {
    const billboards = await prisma.billboard.findMany({
      where: {
        ownerId: req.userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json({
      success: true,
      billboards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const createBillboard = async (req, res) => {
  try {
    const { title, location, city, width, height, pricePerDay, description } =
      req.body;

    const billboard = await prisma.billboard.create({
      data: {
        title,
        location,
        city,
        width: width ? Number(width) : null,
        height: height ? Number(height) : null,
        pricePerDay: Number(pricePerDay),

        description,
        ownerId: req.userId,
      },
    });
    
    res.json({
      success: true,
      message: "Billboard created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Billboard created successfully",
    });
  }
};

module.exports = {
  getMyBillboard,
  createBillboard,
};
