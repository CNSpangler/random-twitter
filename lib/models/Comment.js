const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = commentSchema;
