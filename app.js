const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      flash           = require('connect-flash'),
      passport        = require('passport'),
      LocalStrategy   = require('passport-local'),
      methodOverride  = require('method-override'),
      Campground      = require('./models/campground'),
      Comment         = require('./models/comment'),
      User            = require('./models/user'),
      seedDB          = require('./seeds');

// requiring routes
const commentRoutes     = require('./routes/comments'),
      campgroundRoutes  = require('./routes/campgrounds'),
      indexRoutes       = require('./routes/index');

//mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://wodzynski:mw125422@cluster0-cw5gp.mongodb.net/yelp_camp?retryWrites=true&w=majority');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'I like camping outside. Inside sucks.',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// ussing required routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// app.listen(3000, process.env.IP, () => console.log("The YelpCamp server has started!"));

// alternative version of above's code
const port = process.env.PORT || 3000;
const ip = process.env.IP ||"127.0.0.1";
app.listen(port, function(){
  console.log("Server has started at port " + port + " ip:" + ip);
});