const express = require("express");
const path = require("path");
const hbs = require("hbs");

const indexRouter = require("./app_server/routes/index.js");

// Debug (keep for now)
console.log("indexRouter type:", typeof indexRouter);

const app = express();
const port = 3000;

// Views + Handlebars
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

// Partials
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
