const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Role = require('./roleModel');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  boss: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  peopleList:{
    type: DataTypes.STRING,
    allowNull: true
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize.sync({force: false}).then(() => {
   console.log('User table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});


module.exports = User;
