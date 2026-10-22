const { Op } = require('sequelize');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

const bulkCreate = (comments) => {
  return Comment.bulkCreate(comments);
};

const findById = (commentId) => {
  return Comment.findByPk(commentId);
};

const updateContent = (comment, content) => {
  return comment.update({ content });
};

const findOrCreate = ({ content, postId, userId }) => {
  return Comment.findOrCreate({
    where: { content, postId, userId },
    defaults: { content, postId, userId },
  });
};

const searchByWord = (word) => {
  return Comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
};

const findNewestByPostId = (postId) => {
  return Comment.findAll({
    where: { postId },
    order: [['createdAt', 'DESC']],
    limit: 3,
  });
};

const findByIdWithDetails = (id) => {
  return Comment.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email', 'role'],
      },
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'userId'],
      },
    ],
  });
};

module.exports = {
  bulkCreate,
  findById,
  updateContent,
  findOrCreate,
  searchByWord,
  findNewestByPostId,
  findByIdWithDetails,
};
