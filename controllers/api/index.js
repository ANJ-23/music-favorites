const router = require('express').Router();
const userRoutes = require('./userRoutes');
const songRoutes = require('./songRoutes');
// const favoriteRoutes = require('./favoriteRoutes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);
// router.use('/favorites', favoriteRoutes);

module.exports = router;
