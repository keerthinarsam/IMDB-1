module.exports = app => {
  const movies = require("../controllers/Moviecntrl.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", movies.create);

  // Retrieve all movies
  router.get("/", movies.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", movies.findOne);

  // Update a Tutorial with id
  router.put("/:id", movies.update);

  // Delete a Tutorial with id
  router.delete("/:id", movies.delete);

  // Create a new Tutorial
  router.delete("/", movies.deleteAll);

  app.use("/api/movies", router);
};
