const express     = require('express'),
      router      = express.Router(),
      mongoose    = require('mongoose'),
      Campground  = require('../models/campground'),
      Comment     = require('../models/comment'),
      middleware  = require('../middleware');

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
router.post('/', middleware.isLoggedIn, (req, res) => {
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new.ejs');
});

//SHOW - show info about one campground
router.get('/:id', (req, res) => {
  //find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if(err || !foundCampground){
      console.log(err);
      req.flash("error", "Campground not found.");
      res.redirect('/campgrounds');
    } else {
      console.log(foundCampground);
      //render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.doesLoggedUserMatch, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err){
      req.flash('error', 'Campground not found');
    };
    res.render('campgrounds/edit', {campground: foundCampground});
  });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.doesLoggedUserMatch, (req, res) => {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    // redirect to edited show page
    res.redirect(`/campgrounds/${req.params.id}`);
  });
});

// DESTROY CAMPGROUND ROUTE
mongoose.set('useFindAndModify', false);

router.delete('/:id', middleware.doesLoggedUserMatch, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, campground) => {Comment.deleteMany({_id: {$in: campground.comments}}, err => {
    if(err) {
      console.log(err);
    }
    res.redirect('/campgrounds');
    });
  });
});

module.exports = router;