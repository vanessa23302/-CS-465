/**
 * app_api/models/travlr.js
 * Trip schema + model registration
 */

const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  length: String,
  start: Date,
  resort: String,
  perPerson: Number,
  image: String,
  description: String
});


mongoose.model("Trip", tripSchema);