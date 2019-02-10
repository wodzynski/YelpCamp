const Campground  = require('../models/campground'),
      Comment     = require('../models/comment');
// All middlewares
const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err || !foundComment){
        console.log(err);
        req.flash('error', 'Sorry, that comment does not exist!');
        res.redirect('/campgrounds');
      } else if(foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You don\'t have permission to do that!');
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('back');
  }
};

middlewareObj.doesLoggedUserMatch = (req, res, next) => {
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err, foundCampground) => {
      // check if foundCampground exists, and if it doesn't, throw an error via connect-flas and send us back to the homepage
      if(err || !foundCampground){
        console.log(err);
        req.flash("error", "Campground not found.");
        // If the upper comdition is true this will break out of the middleware and prevent the code below to crash our application
        res.redirect('/campgrounds');
      } else if(foundCampground.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You don\'t have permission to do that!');
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('back');
  }
}

module.exports = middlewareObj;