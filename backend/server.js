require("dotenv").config();

const express = require("express");
const path = require("path");

const app = require("./src/app");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});