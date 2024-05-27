const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('3monthChallenge', 'postgres', 'welcome', {
  host: 'localhost',
  dialect: 'postgres' 
});
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  module.exports =sequelize