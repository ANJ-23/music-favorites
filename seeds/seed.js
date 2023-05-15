const sequelize = require('../config/connection');
const { Songs, User, Favorites } = require('../models');

// import seed files
const favoritesData = require('./favoritesData.json');
const songsData = require('./songsData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // populates database tables via Sequelize
  await User.bulkCreate(userData, {
    individualHooks: true, // activates Hooks; the Hooks are the 'bcrypt' implementations
    returning: true,
  });

  await Songs.bulkCreate(songsData);
  await Favorites.bulkCreate(favoritesData);
  // force: true causes everything to drop

  process.exit(0);
};

seedDatabase();
