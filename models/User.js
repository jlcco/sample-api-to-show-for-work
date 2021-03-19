const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require('./Post');

const reqString = {
  type: String,
  required: true
};

const userSchema = new mongoose.Schema({
  username: reqString,
  email: reqString,
  password: reqString,
  birthDate:reqString,
  phoneNumber: String,
  posts: [
    {
      _id: false,
      postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      },
      isOwnPost: {
        type: Boolean,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;