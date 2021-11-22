const Sequelize = require("sequelize");
const config = require("../config/config");
const User = require("./User");
const Movie = require("./Movie");
const Reservation = require("./Reservation");

const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

db.sequelize = sequelize;

db.User = User;
db.Movie = Movie;
db.Reservation = Reservation;

User.init(sequelize);
Movie.init(sequelize);
Reservation.init(sequelize);

User.associate(db);
Movie.associate(db);


module.exports = db;