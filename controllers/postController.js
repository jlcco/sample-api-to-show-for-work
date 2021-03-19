const Post = require('../models/Post');
const User = require('../models/User');

module.exports.getPost = async (req, res) => {
  const { params, body } = req;

  await Post.findOne({ _id: params.postId })
    .then(foundPost => {
      res.send(`This post's details: ${foundPost}`);
    })
    .catch((err) => res.send(`Error: ${err}`));
}

module.exports.postPost = async (req, res) => {
  const { params, body } = req;

  const newPost = new Post({
    title: body.title,
    author: params.userId,
    content: body.content
  })

  newPost
    .save()
    .then(async newPostData => {
      return await User.findOneAndUpdate(
        {_id: params.userId}, 
        {
          $push: {
            posts: {
            postId: newPostData._id,
            isOwnPost: true
            }
          }
      }, 
        {new: true}
      )
    })
    .then(updatedPostsUser => {
      res.send(`Updated all ${updatedPostsUser.username}'s posts: ${updatedPostsUser.posts}`);
    })
    .catch(err => res.send(`Error: ${err}`));
};

module.exports.deletePost = async (req, res) => {
  Post.findOneAndDelete({_id: req.params.postId})
    .then(deletedPost => {
      res.send(`Following post is deleted: ${deletedPost}`);
    })
    .catch(err => res.send(`Error: ${err}`));
}