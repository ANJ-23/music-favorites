// Handles login functionality (occurs when user presses "login" and "logout")

const router = require('express').Router();
const { User } = require('../../models');

// /api/users
// POST - calling this POST method creates a new user
router.post('/', async (req, res) => {
  console.log ("user create")
  try {
    // temporarily stores new user as a variable
    const newUser = req.body;

    // '.create()' method creates new user to STORE later
    const userData = await User.create(newUser);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // response stores 'userData' to "userData.json"
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log("wtf happened???");
    res.status(400).json(err);
  }
});

// POST - logs in user
router.post('/login', async (req, res) => {
  console.log ("loginRoute");
  try {
    // gathers user emails in data table
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if email is incorrect, send error
    if (!userData) {
      console.log("D'OH!");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // email was correct; now we gather user passwords
    const validPassword = await userData.checkPassword(req.body.password);

    // if password is incorrect, send error
    if (!validPassword) {
      console.log("Oh, it's the validPassword stuff.");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // email AND password are correct
    // now we save the session ('user_id' = user's ID in data table, 'logged_in' = true)
    // also, 'req.session' IS NOT POSSIBLE WITHOUT "require('express-session')" AND "require('connect-session-sequelize')(session.Store)"
    console.log(req.session);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log("wat");
    res.status(400).json(err);
  }
});

// logs out user
// logout button pressed = logs out user
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
