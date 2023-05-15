const router = require ('express').Router();
const { Songs, User, Favorites } = require('../models');

// default route - homepage
router.get("/", async (req, res) => {
    try{
        // renders "homepage" handlebar; prompts the user to sign-in or log-in
        // (Needed?) also checks if user is logged in
        res.render("homepage", {
            // logged_in: req.session.logged_in
        });

        
    } catch(err){
        console.log(err)
    }
})
  
// If the user is already logged in, redirect the request to the "/songs" page
router.get('/login', (req, res) => {
    console.log(req.session)
    // if (req.session.logged_in) {
    //     res.redirect('/songs');
    //     return;
    // }

    res.render('login');
});

// GET - obtains Page 2 (song list)
router.get("/dashboard", async (req, res) => {
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

// GET - obtains Page 3 (user's favorites)
router.get("/favorites", async (req, res) => {
    try{
        console.log ("Test")
        res.render("favorites")
    } catch(err){
        console.log(err)
    }
})


// This will render out a page for an individual user
router.get("/favorites/:id", async(req, res) => {
    // adds new favorite song
    const foundUser = await User.findByPk(req.params.id).include([
        { 
            model: "Songs", 
            through: "Favorites", 
            as: "favorite_songs" 
        }
    ]);

    // renders new favorite song
    res.render("favorites", {
        user: foundUser, // refers to the user's Songs through Favorites
    })
})

// GET - obtains favorites from specific user (in theory)
// [] OFFICE HOURS: ask how to store & obtain favorites as a specific user
/* router.get("/favorites/:id", async (req, res) => {
    try {
        // obtains favorites based on user's ID value
        const favoritesData = await Favorites.findAll(req.params.id, {
          include: [
            {
                model: User,
                attributes: ['name'],
            },
          ],
        });
    
        // Serializes all favorites
        const favorites = favoritesData.map((fav) => fav.get({ plain: true }));
    
        // renders 'favorites' handlebar
        res.render('favorites', {
            favorites,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/addToFavorite',(req,res)=>{
    console.log(req.body);
   res.status(200).json("Success")
}) */

module.exports = router;