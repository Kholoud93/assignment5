const { DataTypes, ValidationError, ValidationErrorItem } = require('sequelize');
const sequelize = require('../config/database');

/*
Question:
Define the Users model using sequelize.define.
Fields:
- id (Primary Key, Auto Increment)
- name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR)
- role (ENUM: user, admin)
- createdAt (Date)
- updatedAt (Date)

Apply built-in validation to validate the email format.
Add a custom validation method "checkPasswordLength" that ensures the password
length is greater than 6 characters.
Add a custom validation method "checkNameLength" to a "beforeCreate" hook that
ensures the name of the user is greater than 2 characters.
*/

function checkPasswordLength(value) {
  if (!value || value.length <= 6) {
    throw new Error('Password length must be greater than 6 characters');
  }
}

function checkNameLength(user) {
  if (!user.name || user.name.length <= 2) {
    throw new ValidationError('Validation error', [
      new ValidationErrorItem(
        'Name must be greater than 2 characters',
        'Validation error',
        'name',
        user.name
      ),
    ]);
  }
}

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength,
      },
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
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
    tableName: 'Users',
    timestamps: true,
    hooks: {
      beforeCreate: checkNameLength,
    },
  }
);

module.exports = User;
