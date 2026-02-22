require("dotenv").config();

const express = require("express");
const passport = require("passport");

// Load DB + models first so mongoose.model("User") exists everywhere
require("./app_api/models/db");

// Load passport strategy after models
require("./app_api/config/passport");

// Load routes
const routesApi = require("./app_api/routes/index");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport init
app.use(passport.initialize());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
// api routes
app.use("/api", routesApi);

// error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next(err);
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("MongoDB should be connected above");
  console.log("Server running on port " + PORT);
});

module.exports = app;