// Routes to user's favorites + renders that user's favorite songs

const router = require('express').Router();
const { User } = require('../../models');

// /users
// default '/users' page
router.post('/', async (req, res) => {
  console.log ("user create")
  try {
    const userData = await User.create(req.body);

    // sets session data - session ID is user's ID, "logged_in" flag is "true"
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logs in user ("creates" new user instance?)
// Not sure if this is used here, used in 'html-routes.js', or needed at all
router.post('/login', async (req, res) => {
  console.log ("loginRoute")
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logs out user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
