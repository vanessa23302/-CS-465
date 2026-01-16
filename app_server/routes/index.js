const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/main");
const ctrlTravlr = require("../controllers/travlr");

// Home page
router.get("/", ctrlMain.index);

// Travel page
router.get("/travel", ctrlTravlr.travel);

module.exports = router;
