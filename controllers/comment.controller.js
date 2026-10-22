const commentService = require('../services/comment.service');

const createComments = async (req, res) => {
  try {
    const comments = await commentService.createComments(req.body);
    return res.status(201).json(comments);
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await commentService.updateComment(req.params.commentId, req.body);
    return res.json(comment);
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
};

const findOrCreateComment = async (req, res) => {
  try {
    const result = await commentService.findOrCreateComment(req.body);
    return res.status(result.created ? 201 : 200).json(result);
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
};

const searchComments = async (req, res) => {
  try {
    const result = await commentService.searchComments(req.query.word);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getNewestComments = async (req, res) => {
  try {
    const comments = await commentService.getNewestComments(req.params.postId);
    return res.json(comments);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getCommentDetails = async (req, res) => {
  try {
    const comment = await commentService.getCommentDetails(req.params.id);
    return res.json(comment);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  createComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentDetails,
};
