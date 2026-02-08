const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET /api/trips/:tripid
const tripsReadOne = async (req, res) => {
  const { tripid } = req.params;

  // Validate MongoDB ObjectId format first (prevents CastError)
  if (!mongoose.Types.ObjectId.isValid(tripid)) {
    return res.status(400).json({
      message: "Invalid trip ID format"
    });
  }

  try {
    const trip = await Trip.findById(tripid);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsReadOne
};
