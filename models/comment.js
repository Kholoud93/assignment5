const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

/*
Question:
Define the Comments model using Model.init.
Fields:
- id (Primary Key, Auto Increment)
- content (TEXT)
- postId (Foreign Key to Posts)
- userId (Foreign Key to Users)
- createdAt (Date)
- updatedAt (Date)
*/

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true,
  }
);

const User = require('./user');
const Post = require('./post');

/*
Question:
Link Users, Posts, and Comments.
A user creates posts and comments.
A post belongs to a user and has many comments.
A comment belongs to a post and a user.
*/

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;
