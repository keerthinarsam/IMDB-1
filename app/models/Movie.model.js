module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movie", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    genres : {
      type: Sequelize.STRING
    },
    rating : {
      type: Sequelize.STRING
    },
    yearofRelease: {
      type: Sequelize.DATE,
    },
  });

  return Movie;
};
