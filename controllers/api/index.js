const router = require('express').Router();
const userRoutes = require('./userRoutes');
const songRoutes = require('./songRoutes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);

module.exports = router;
