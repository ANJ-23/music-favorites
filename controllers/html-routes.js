const router = require ('express').Router();
const { Songs, User, Favorites } = require('../models');

// custom middleware that checks if user's authenticated
const withAuth = require('../utils/auth');

// GET - Page 1: homepage (default route)
router.get("/", async (req, res) => {
    try{
        // renders "homepage" handlebar; prompts the user to sign-in or log-in
        res.render("homepage", {
            // logged_in: req.session.logged_in
        });

        
    } catch(err){
        console.log(err)
    }
})

// GET - Page 2: song list (the first page the user sees upon signing/logging in)
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        // gathers all songs from the "Songs" table via Sequelize object
        const songData = await Songs.findAll({});

        // Serialize & map data so the Handlebar template can read it
        const songs = songData.map((song) => song.get({ plain: true }));

        res.render("dashboard", {
            songs,
            loggedIn: req.session.loggedIn,
        })
    } catch(err) {
        console.log(err)
    }
})

// GET - Page 3: user's favorites (renders 'favorites' page for individual user)
router.get("/favorites", withAuth, async(req, res) => {
    // obtain favorite songs under current user's ID (req.session.id)
    const favSongs = await Favorites.findAll({
        where: {
            user_id: req.session.user_id,
        }
    });

    // console.log("current session ID: ", req.session.id);
    // console.log("req.session.user_id: ", req.session.user_id);
    // console.log("req.body: ", req.body);
    // console.log(favSongs);

    // serializes & maps out favorite songs; makes them readable
    const songs = favSongs.map((song) => song.get({ plain: true }));

    // renders favorite songs
    res.render("favorites", {
        songs,
        loggedIn: req.session.loggedIn,
    })
})

module.exports = router;