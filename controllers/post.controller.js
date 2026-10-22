const postService = require('../services/post.service');

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.body.userId ?? req.query.userId;
    const result = await postService.deletePost(req.params.postId, userId);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getPostsDetails = async (req, res) => {
  try {
    const posts = await postService.getPostsDetails();
    return res.json(posts);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getPostsCommentCount = async (req, res) => {
  try {
    const posts = await postService.getPostsCommentCount();
    return res.json(posts);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
};
