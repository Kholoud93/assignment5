const { fn, col } = require('sequelize');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const create = async ({ title, content, userId }) => {
  const post = new Post({ title, content, userId });
  await post.save();
  return post;
};

const findById = (postId) => {
  return Post.findByPk(postId);
};

const remove = (post) => {
  return post.destroy();
};

const findAllWithDetails = () => {
  return Post.findAll({
    attributes: ['id', 'title'],
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
      {
        model: Comment,
        attributes: ['id', 'content'],
      },
    ],
  });
};

const findAllWithCommentCount = () => {
  return Post.findAll({
    attributes: {
      include: [[fn('COUNT', col('Comments.id')), 'commentCount']],
    },
    include: [
      {
        model: Comment,
        attributes: [],
      },
    ],
    group: ['Post.id'],
  });
};

module.exports = {
  create,
  findById,
  remove,
  findAllWithDetails,
  findAllWithCommentCount,
};
