const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport'),
      User      = require('../models/user');

// root route
router.get('/', (req,res) => {
  res.render('landing');
});

// AUTHENTICATION ROUTES
// show register form
router.get('/register', (req, res) => res.render('register'));

// handle sign up logic
router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/campgrounds'))
  });
});

// show login form
router.get('/login', (req, res) => res.render('login'));

// handling login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {});

// log out route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/campgrounds');
});

module.exports = router;