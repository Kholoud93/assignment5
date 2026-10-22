const User = require('../models/user');

const findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

const create = async ({ name, email, password, role }) => {
  const user = User.build({ name, email, password, role });
  await user.save();
  return user;
};

const upsert = async (id, body) => {
  const result = await User.upsert(
    {
      ...body,
      id: Number(id),
    },
    { validate: false }
  );

  return Array.isArray(result) ? result[0] : result;
};

const findById = (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ['role'] },
  });
};

module.exports = {
  findByEmail,
  create,
  upsert,
  findById,
};
