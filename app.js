const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

// Example database-style API route
app.get("/api/trips", (req, res) => {

  const trips = [
    {
      code: "HAW",
      name: "Hawaiian Paradise",
      length: "7 days",
      perPerson: 1999
    },
    {
      code: "EUR",
      name: "European Adventure",
      length: "10 days",
      perPerson: 2499
    }
  ];

  res.json(trips);

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
