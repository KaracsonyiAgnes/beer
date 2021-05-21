module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.error = 'Please log in!';
    res.redirect('/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    console.log('redirect to dashboard');
    return res.redirect('/');
  }
};
