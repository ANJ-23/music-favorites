const User = require('./user');
const Songs = require('./songs');
const Favorites = require('./favorites');

/* User.hasMany(Songs, { //one-to-many relationship
  foreignKey: 'user_id', //User's key will be primary key 
  onDelete: 'CASCADE' //if user deletes, songs will delete 
}); */

/* Songs.belongsTo(User, {
  foreignKey: 'user_id'
}); */

/* Favorites.belongsTo(User, {
  foreignKey: 'user_id'
}); */

// Songs belongToMany User (through Favorites)
Songs.belongsToMany(User, {
  through: {
      model: Favorites,
      unique: false,
  },
});

// User belongToMany Songs (through Favorites)
User.belongsToMany(Songs, {
  through: {
      model: Favorites,
      unique: false,
  },
});

module.exports = { User, Songs, Favorites };