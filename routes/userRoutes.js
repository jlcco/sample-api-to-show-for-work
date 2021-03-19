const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');



router
  .route('/:userId')
  .get(userController.getDetails)
  .post(userController.updateDetails);

router.route('/:userId/posts').get(userController.getAllPosts);

router.route('/:userId/delete').delete(userController.deleteUser);

router.post('/:userId/post', postController.postPost);



module.exports = router;