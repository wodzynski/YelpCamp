const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Campground  = require('./models/campground'),
      seedDB      = require('./seeds');

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
      res.render('index', {campgrounds:allCampgrounds});
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
  res.render('new.ejs');
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
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, process.env.IP, () => {
  console.log("The YelpCamp server has started!");
});