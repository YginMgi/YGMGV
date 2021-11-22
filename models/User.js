const Sequelize = require("sequelize");
const Movie = require('./Movie');
const Reservation = require('./Reservation');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20), 
          allowNull: false,
          primaryKey: true
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        name:{
            type: Sequelize.STRING(20), 
            allowNull: false  
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    User.belongsToMany(db.Movie, {through: db.Reservation});  
  }
}

module.exports = User;

