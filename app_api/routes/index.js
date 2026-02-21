const express = require("express");
const router = express.Router();

const ctrlTravlr = require("../controllers/travlr");

// GET all trips
router.get("/trips", ctrlTravlr.tripsList);

// POST add trip
router.post("/trips", ctrlTravlr.tripsAddOne);

// GET one trip
router.get("/trips/:tripid", ctrlTravlr.tripsReadOne);

// PUT update trip
router.put("/trips/:tripid", ctrlTravlr.tripsUpdateOne);

// DELETE trip
router.delete("/trips/:tripid", ctrlTravlr.tripsDeleteOne);

module.exports = router;