const User = require('../models/User');
const Post = require('../models/Post');



module.exports.getDetails = async (req, res) => {
  await User.findOne({_id: req.params.userId})
    .then(foundUser => res.send(`${foundUser.username}'s details: ${foundUser}`))
    .catch(err => res.send(`Error: ${err}`));
};

module.exports.updateDetails = async (req, res) => {
  const { params, body } = req;

  const updateQuery = {};

  if (body.username) {
    updateQuery.username = body.username;
  }

  if (body.email) {
    updateQuery.email = body.email;
  }

  if (body.password) {
    updateQuery.password = body.password;
  }

  if (body.birthDate) {
    updateQuery.birthDate = body.birthDate;
  }

  if (body.phoneNumber) {
    updateQuery.phoneNumber = body.phoneNumber;
  }

  await User.findOneAndUpdate(
    {_id: params.userId}, 
    {$set:updateQuery}, 
    {new: true}
  )
    .then(foundUser => res.send(`${foundUser.username} updated their info: ${foundUser}`))
    .catch(err => res.send(`Error: ${err}`));
};

module.exports.deleteUser = async (req, res) => {
  User.findOneAndDelete({_id: req.params.userId})
    .then(deletedUser => {
      res.send(`You deleted your user account with the details: ${deletedUser}`);
    })
    .catch(err => res.send(`Error: ${err}`));
}

module.exports.getAllPosts = async (req, res) => {
  const { params, body } = req;

  await Post.find({ author: params.userId })
    .then((foundPosts) => {
      res.send(`All your posts: ${foundPosts}`);
    })
    .catch((err) => res.send(`Error: ${err}`));
};

