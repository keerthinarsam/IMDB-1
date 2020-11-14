const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "movie application" });
});

require("./app/routes/Movieroute")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
