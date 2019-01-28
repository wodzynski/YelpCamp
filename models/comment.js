const mongoose  = require('mongoose');

// schema for creating comments
const commentSchema = mongoose.Schema({
  text: String,
  author: String
});


module.exports = mongoose.model('Comment', commentSchema);