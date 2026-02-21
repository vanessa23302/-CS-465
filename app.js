const express = require("express");
const path = require("path");
const hbs = require("hbs");

const cors = require('cors');


//  CONNECT DB FIRST
require("./app_server/models/db");

//  REGISTER MODEL SECOND
require("./app_api/models/travlr");

// Website routes
const indexRouter = require("./app_server/routes/index");

// API routes
const apiRouter = require("./app_api/routes");

const app = express();
const port = 3000;

// Views + Handlebars
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

// Partials
hbs.registerPartials(
  path.join(__dirname, "app_server", "views", "partials")
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Website routes
app.use("/", indexRouter);

// API routes
app.use("/api", apiRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
