const router = require('express').Router();

// lists routes to different pages
const apiRoutes = require('./api');
const homeRoutes = require('./html-routes');

// creates URL paths to routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
