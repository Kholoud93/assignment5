const { Sequelize } = require('sequelize');

/*
Question:
Connect the application to the MySQL database with Sequelize.
*/

const database = 'assignment5';
const username = 'root';
const password = '';
const host = 'localhost';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

async function connectDatabase() {
  const server = new Sequelize('', username, password, {
    host,
    dialect: 'mysql',
    logging: false,
  });

  await server.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await server.close();
  await sequelize.authenticate();
}

module.exports = sequelize;
module.exports.connectDatabase = connectDatabase;
