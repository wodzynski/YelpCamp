const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      Campground    = require('./models/campground'),
      Comment       = require('./models/comment'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

app.get('/', (req,res) => {
  res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
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
app.post('/campgrounds', (req, res) => {
  //get data from form and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
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
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new.ejs');
});

//SHOW - show info about one campground
app.get('/campgrounds/:id', (req, res) => {
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

// COMMENTS ROUTES

app.get('/campgrounds/:id/comments/new', (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          console.log(err);
        } else {
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect to campground show page
          res.redirect(`/campgrounds/${campground._id}`);
        }
      })
    }
  })
})

app.listen(3000, process.env.IP, () => console.log("The YelpCamp server has started!"));