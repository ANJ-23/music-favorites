const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorites extends Model { }

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    artist: {
      type: DataTypes.STRING,
    },
    song_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Songs',
        key: 'id',
      },
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
    modelName: 'Favorites',
  }
);

module.exports = Favorites;
