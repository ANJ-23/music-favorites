const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the home route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;
