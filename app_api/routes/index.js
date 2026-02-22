const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ctrlTravlr = require("../controllers/travlr");
const authController = require("../controllers/authentication");


/* =====================================================
   JWT AUTHENTICATION MIDDLEWARE
   ===================================================== */

const authenticateJWT = (req, res, next) => {

  const authHeader = req.headers.authorization;

  // No token provided
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }

  // Extract token from "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token"
      });
    }

    req.user = user;
    next();
  });
};


/* =====================================================
   AUTH ROUTES
   ===================================================== */

// Register admin user
router.post("/register", authController.register);

// Login admin user
router.post("/login", authController.login);


/* =====================================================
   TRIP ROUTES
   ===================================================== */

// PUBLIC ROUTES (no login required)

// Get all trips
router.get("/trips", ctrlTravlr.tripsList);

// Get one trip
router.get("/trips/:tripid", ctrlTravlr.tripsReadOne);


// PROTECTED ADMIN ROUTES (login required)

// Add trip
router.post("/trips", authenticateJWT, ctrlTravlr.tripsAddOne);

// Update trip
router.put("/trips/:tripid", authenticateJWT, ctrlTravlr.tripsUpdateOne);

// Delete trip
router.delete("/trips/:tripid", authenticateJWT, ctrlTravlr.tripsDeleteOne);


module.exports = router;