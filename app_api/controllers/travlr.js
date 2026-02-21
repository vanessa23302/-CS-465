/**
 * app_api/controllers/travlr.js
 */

const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

// GET all trips
const tripsList = (req, res) => {
  Trip.find({})
    .exec()
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.status(500).json(err));
};

// GET one trip
const tripsReadOne = (req, res) => {
  const tripid = req.params.tripid;

  if (!tripid) {
    return res.status(400).json({ message: "tripid is required" });
  }

  Trip.findById(tripid)
    .exec()
    .then((trip) => {
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      res.status(200).json(trip);
    })
    .catch((err) => res.status(500).json(err));
};

// POST add trip
const tripsAddOne = (req, res) => {
  Trip.create({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  })
    .then((trip) => res.status(201).json(trip))
    .catch((err) => res.status(400).json(err));
};

// PUT update trip
const tripsUpdateOne = (req, res) => {
  const tripid = req.params.tripid;

  if (!tripid) {
    return res.status(400).json({ message: "tripid is required" });
  }

  Trip.findById(tripid)
    .exec()
    .then((trip) => {
      if (!trip) return res.status(404).json({ message: "Trip not found" });

      trip.code = req.body.code ?? trip.code;
      trip.name = req.body.name ?? trip.name;
      trip.length = req.body.length ?? trip.length;
      trip.start = req.body.start ?? trip.start;
      trip.resort = req.body.resort ?? trip.resort;
      trip.perPerson = req.body.perPerson ?? trip.perPerson;
      trip.image = req.body.image ?? trip.image;
      trip.description = req.body.description ?? trip.description;

      return trip.save();
    })
    .then((updatedTrip) => res.status(200).json(updatedTrip))
    .catch((err) => res.status(500).json(err));
};

// DELETE trip
const tripsDeleteOne = (req, res) => {
  const tripid = req.params.tripid;

  if (!tripid) {
    return res.status(400).json({ message: "tripid is required" });
  }

  Trip.findByIdAndDelete(tripid)
    .then((trip) => {
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      res.status(204).json(null);
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  tripsList,
  tripsReadOne,
  tripsAddOne,
  tripsUpdateOne,
  tripsDeleteOne
};