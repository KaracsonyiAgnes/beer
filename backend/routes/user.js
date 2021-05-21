const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.schema');
const {forwardAuthenticated} = require('../auth');
const beerController = require('../controllers/beer.controller');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', async (req, res) => {
  console.log('register endpoint');
  const user = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    favorites: [],
  });
  let errors = [];

  if (!user.name || !user.email || !user.password) {
    errors.push({msg: 'Please fill in all fields'});
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    User.findOne({email: user.email}).then(foundUser => {
      if (foundUser) {
        errors.push({msg: 'Email already exists'});
        res.send(errors);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(buser => {
                res.send(buser);
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
  }
});

// Login
router.post('/login', (req, res, next) => {
  console.log('Login endpoint ');

  passport.authenticate('local', {session: false}, (err, user) => {
    let errors = [];
    if (err) {
      errors.push({msg: 'Could not find user'});
      res.send(errors);
    }

    if (user) {
      user.token = user.generateJWT();

      res.send(user.toAuthJSON());
    } else {
      errors.push({msg: 'Could not find user'});
      res.send(errors);
    }
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
  console.log('redirect to login');
});

// get specific user
router.get('/:userId', async (req, res) => {
  try {
    let user = await User.findById(req.params.userId).populate('favorites').populate('categories');

    user.favorites = await Promise.all(user.favorites.map(async beer => {
      beer = await beerController.getCategoriesOfBeerObjects(beer);
      return beer;
    }));

    res.send(user.toAuthJSON());
  } catch (err) {
    await res.json({message: err});
  }
});

// add beer to favorites
router.patch('/favorite', async (req, res) => {
  let favorites = req.body.user.favorites;
  favorites.push(req.body.beerId);
  try {
    const updatedUser = await User.updateOne(
      {_id: req.body.user._id},
      {$set: {favorites: favorites}}
    );
    await res.send(updatedUser);
  } catch (err) {
    await res.json({message: err});
  }
});

module.exports = router;
