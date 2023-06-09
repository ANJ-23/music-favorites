const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Songs extends Model { }

Songs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
    },
    user_id: { //foreign key for the relationship between the songs and user models 
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Songs',
  }
);

module.exports = Songs;
