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
    // FROM Andrew: Instead of having 'name' and 'artist' keys in "Favorites", I think the "Songs" object's ID should be imported & utilized for relationship mapping (see index.js for my suggested code):
    // "Songs" belongs to many "User" (through model: "Favorites"?)
    // "User" belongs to many "Songs" (through model: "Favorites"?)
    /* 
    song_id code:

    song_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Songs',
        key: 'id',
      },
    },
    */
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
    modelName: 'Favorites',
  }
);

module.exports = Favorites;
