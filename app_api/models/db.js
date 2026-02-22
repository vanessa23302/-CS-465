/**
 * app_api/models/db.js
 */

const mongoose = require("mongoose");

const dbURI = "mongodb://127.0.0.1/travlr";

mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// LOAD MODELS HERE
require("./travlr");
require('./users');