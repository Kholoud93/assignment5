const { ValidationError, UniqueConstraintError } = require('sequelize');
const userService = require('../services/user.service');

function sendError(res, error) {
  if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors.map((item) => item.message),
    });
  }

  return res.status(error.status || 500).json({ message: error.message });
}

const signup = async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

const upsertUser = async (req, res) => {
  try {
    const user = await userService.upsertUser(req.params.id, req.body);
    return res.json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.query.email);
    return res.json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = {
  signup,
  upsertUser,
  getUserByEmail,
  getUserById,
};
