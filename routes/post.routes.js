const express = require('express');
const {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
} = require('../controllers/post.controller');

const router = express.Router();

router.post('/posts', createPost);
router.delete('/posts/:postId', deletePost);
router.get('/posts/details', getPostsDetails);
router.get('/posts/comment-count', getPostsCommentCount);

module.exports = router;
