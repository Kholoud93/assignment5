const userRepository = require('../repositories/user.repository');

/*
Question:
Create a new user using build and save.
Make sure that the email does not exist before creating the user.
Handle validation errors.
URL: POST /users/signup
*/

const signup = async ({ name, email, password, role }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    const error = new Error('Email already exists');
    error.status = 400;
    throw error;
  }

  return userRepository.create({ name, email, password, role });
};

/*
Question:
Create or update a user based on the primary key, and use the skip validation option.
URL: PUT /users/:id
*/

const upsertUser = (id, body) => {
  return userRepository.upsert(id, body);
};

/*
Question:
Find a user by email address.
URL: GET /users/by-email?email=user1@gmail.com
*/

const getUserByEmail = async (email) => {
  if (!email) {
    const error = new Error('Email is required');
    error.status = 400;
    throw error;
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};

/*
Question:
Retrieve a user by primary key, excluding the role field from the response.
URL: GET /user/:id
*/

const getUserById = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};

module.exports = {
  signup,
  upsertUser,
  getUserByEmail,
  getUserById,
};
