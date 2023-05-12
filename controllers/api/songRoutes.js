// Renders songs in the Songs table

const router = require('express').Router();
const { Songs } = require('../../models'); // assumes the 'song' model is named "Songs"

// posts songs & its details to the "Songs" page
router.post('/', async (req, res) => {
  try {
    const newProject = await Songs.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// renders ALL favorited songs to "Songs" page
router.get('/', async (req, res) => {
  try {
    const songData = await Songs.findAll({});

    // renders project from 'project' model to homepage (in '../../models')
    res.render('homepage', {
      songData,
      loggedIn: req.session.loggedIn // does the user have to be logged in?
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

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

// Deletes a song under specific ID
router.delete('/:id', async (req, res) => {
  try {
    const songData = await Songs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!songData) {
      res.status(404).json({ message: "How did you click on a song that's not on this page?" });
      return;
    }

    res.status(200).json(songData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
