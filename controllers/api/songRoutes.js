// Renders songs in the Songs table(?)
// or does this render 

const router = require('express').Router();
const { Songs, User, Favorites } = require('../../models'); // assumes the 'song' model is named "Songs"

// adds new song to user's favorites
router.post('/add', async (req, res) => {
  console.log("POST: /api/songs/add")

  try {
    // '.create()' method creates new favorite to STORE later
    // creates new "Favorites" data object
    const newFav = await Favorites.create({
      song_id: parseInt(req.body.song_id), // 'song_id' - requested by "/public/js/favoritesAdd.js"
      user_id: req.session.user_id, // currently logged in user's ID
    });

    req.session.save(() => {

      // response stores 'newFav' to "favoritesData.json"
      res.status(200).json(newFav);
    });
  } catch (err) {
    console.log("Error is happening in this spot")
    res.status(400).json(err);
  }
});

// GET - renders ALL (favorited) songs to "Songs" page
/* router.get('/', async (req, res) => {
  try {
    const songData = await Songs.findAll({});
    console.log(songData);

    // renders project from 'project' model to homepage (in '../../models')
    res.render('homepage', {
      songData,
      loggedIn: req.session.loggedIn // does the user have to be logged in?
    });
  } catch (err) {
    res.status(400).json(err);
  }
}); */

// renders ONE song
/* router.get('/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {});

    // renders project from 'project' model (in '../../models')
    res.render('project', {
      projectData,
      loggedIn: req.session.loggedIn // does the user have to be logged in?
    });
  } catch (err) {
    res.status(400).json(err);
  }
}); */

// Deletes a favorited song under specific ID
router.delete('/delete/:id', async (req, res) => {
  try {
    // finds a "Favorites" table object with the corresponding ID; queries a '.destroy()' method
    const deleteFav = await Favorites.destroy({
      where: {
        song_id: req.params.id,
      },
    });

    // if the Favorite song somehow doesn't exist on the page, ??????
    if (!deleteFav) {
      res.status(404).json({ message: "How did you delete a favorite song that's not on this page?" });
      return;
    }

    // activates the '.destroy()' query
    res.status(200).json(deleteFav);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
