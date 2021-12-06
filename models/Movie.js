const Sequelize = require("sequelize");
const User = require("./User");
const Reservation = require('./Reservation');


class Movie extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        movieId: {
          type: Sequelize.STRING(20), 
          allowNull: false,
          primaryKey: true
        },
        time:{
            type: Sequelize.DATE, 
            allowNull: false  
        },
        theater:{
            type: Sequelize.STRING(45),
            allowNull: false
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Movie",
        tableName: "movie",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    Movie.belongsToMany(db.User, {through: db.Reservation });  
  }
}


module.exports = Movie;

