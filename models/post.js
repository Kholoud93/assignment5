const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

/*
Question:
Define the Posts model using Model.init.
Fields:
- id (Primary Key, Auto Increment)
- title (VARCHAR)
- content (TEXT)
- userId (Foreign Key to Users)
- createdAt (Date)
- updatedAt (Date)

Apply soft-delete (paranoid) to the post table.
*/

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: true,
    paranoid: true,
  }
);

const User = require('./user');

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;
