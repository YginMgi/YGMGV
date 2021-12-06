const Sequelize = require("sequelize");

class Reservation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reservationId: {
            type: Sequelize.INTEGER, 
            autoIncrement:true,
            primaryKey: true,

          },
        seat: {
            type: Sequelize.STRING(20), 
            allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Reservation",
        tableName: "reservation",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Reservation;

