const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");
const fs=require("fs");

const path=require("path");

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

const getAllBillboards = async (req, res) => {
  try {
    const billboards = await prisma.billboard.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      billboards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createBillboard = async (req, res) => {
  try {
    const { title, location, city, width, height, pricePerDay, description } =
      req.body;
      console.log(req.file);

    const billboard = await prisma.billboard.create({
      data: {
        title,
        location,
        city,
        width: width ? Number(width) : null,
        height: height ? Number(height) : null,
        pricePerDay: Number(pricePerDay),
        imageUrl: `/uploads/${req.file.filename}`,

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

const getBillboardById = async (req, res) => {
  try {
    const billboard = await prisma.billboard.findFirst({
      where: {
        id: req.params.id,
        ownerId: req.userId, // ensures the logged-in user owns it
      },
    });

    if (!billboard) {
      return res.status(404).json({
        success: false,
        message: "Billboard not found",
      });
    }
    res.json({
      success: true,
      billboard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
const updateBillboard = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if billboard exists and belongs to the logged-in user
    const billboard = await prisma.billboard.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    if (!billboard) {
      return res.status(404).json({
        success: false,
        message: "Billboard not found",
      });
    }

    // Update billboard
    const updatedBillboard = await prisma.billboard.update({
      where: {
        id,
      },
      data: {
        title: req.body.title,
        location: req.body.location,
        city: req.body.city,
        width: parseFloat(req.body.width),
        height: parseFloat(req.body.height),
        pricePerDay: parseFloat(req.body.pricePerDay),
        description: req.body.description,
      },
    });

    res.status(200).json({
      success: true,
      message: "Billboard updated successfully",
      billboard: updatedBillboard,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteBillboard = async (req, res) => {
  const result = await prisma.billboard.deleteMany({
    where: {
      id: req.params.id,
      ownerId: req.userId,
    },
  });

  if (result.count === 0) {
    return res.status(404).json({
      message: "Billboard not found or unauthorized",
    });
  }
  res.json({
    success: true,
    message: "deleted",
  });
};

module.exports = {
  getMyBillboard,
  createBillboard,
  deleteBillboard,
  getBillboardById,
  updateBillboard,
  getAllBillboards
};
