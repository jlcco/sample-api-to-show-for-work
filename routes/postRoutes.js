const router = require('express').Router();
const postController = require('../controllers/postController');

router.get("/:postId", postController.getPost);

router.delete("/:postId/delete", postController.deletePost);

module.exports = router;