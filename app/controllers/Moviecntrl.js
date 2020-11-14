const db = require("../models");
const Movie = db.movies;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const movie = {
    title: req.body.title,
    description: req.body.description,
    genres: req.body.genres,
    rating: req.body.rating,
    yearofRelease : req.body.yearofRelease,
  };

  
  Movie.create(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the movies."
      });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Movie.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving movies with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Movie.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "movies was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update movies with id=${id}. Maybe movies was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating movies with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "movies was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete movies with id=${id}. Maybe movies was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete movies with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Movie.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} movies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all movies."
      });
    });
};


exports.findAllPublished = (req, res) => {
  Movie.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
};
