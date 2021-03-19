const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true
};

const postSchema = new Schema({
  title: reqString,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: reqString
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;