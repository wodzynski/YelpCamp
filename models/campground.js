const mongoose = require('mongoose');
// Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model('Campground', campgroundSchema);