const express = require('express');
const {
  createComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentDetails,
} = require('../controllers/comment.controller');

const router = express.Router();

router.post('/comments', createComments);
router.post('/comments/find-or-create', findOrCreateComment);
router.get('/comments/search', searchComments);
router.get('/comments/newest/:postId', getNewestComments);
router.get('/comments/details/:id', getCommentDetails);
router.patch('/comments/:commentId', updateComment);

module.exports = router;
