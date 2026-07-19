const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload =require("../middlewares/upload");
const {
  getMyBillboard,
  createBillboard,
  deleteBillboard,
  getBillboardById,
  updateBillboard,
  getAllBillboards,
} = require("../controllers/billboard");
router.get("/", getAllBillboards);

router.get("/getMyBillboard", auth, getMyBillboard);
router.post("/createBillboard", auth, upload.single("image"), createBillboard);

router.get("/:id", auth, getBillboardById);
router.delete("/deleteBillboard/:id", auth, deleteBillboard);
router.put("/:id", auth, updateBillboard), 

module.exports = router;
