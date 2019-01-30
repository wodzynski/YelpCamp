const express     = require('express'),
      router      = express.Router(),
      Campground  = require('../models/campground');

router.get('/', (req, res) => {
  //GET all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds:allCampgrounds});
    }
  });
  // res.render('campgrounds', {campgrounds: campgrounds});
});

//CREATE - add new campground to DB
router.post('/', isLoggedIn, (req, res) => {
  //get data from form and add to campground array
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newCampground = {name: name, image: image, description: desc, author: author};
  // Create a new campground and save to the DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

//NEW - show form to create new campground
//executed before INFO because of the order
router.get('/new',isLoggedIn, (req, res) => {
  res.render('campgrounds/new.ejs');
});

//SHOW - show info about one campground
router.get('/:id', (req, res) => {
  //find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if(err){
      console.log(err);
    }else {
      console.log(foundCampground);
      //render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;