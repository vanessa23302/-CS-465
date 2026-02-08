const express = require("express");
const router = express.Router();

const ctrlTravlr = require("../controllers/travlr");

router.get("/trips", ctrlTravlr.tripsList);
router.get("/trips/:tripid", ctrlTravlr.tripsReadOne);

module.exports = router;
