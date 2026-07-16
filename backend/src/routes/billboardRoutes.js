const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getMyBillboard,createBillboard
} = require("../controllers/billboard");


router.get("/getMyBillboard",auth,getMyBillboard);
router.post("/createBillboard",auth,createBillboard);

module.exports = router;