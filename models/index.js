const User = require('./user');
const Songs = require('./songs');
const Favorites = require('./favorites');

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