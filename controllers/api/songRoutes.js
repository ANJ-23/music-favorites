// Handles adding & removing songs from User's 'Favorites' list

const router = require('express').Router();
const { Songs, User, Favorites } = require('../../models'); // assumes the 'song' model is named "Songs"

// adds new song to user's favorites
router.post('/add', async (req, res) => {
  console.log("POST: /api/songs/add")

  try {
    // stores request's song_id as a variable
    const songId = req.body.song_id;

    // find song by Song's ID (stored in 'songId') & stores that song
    const foundSong = await Songs.findByPk(songId, 
      {
        where: {
          id: songId,
        }
      }
    );

    // '.create()' method creates new favorite to STORE later
    // creates new "Favorites" data object using the "found song's" keys
    const newFav = await Favorites.create({
      name: foundSong.name,
      artist: foundSong.artist,
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

// Deletes a favorited song (under specific ID?)
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
