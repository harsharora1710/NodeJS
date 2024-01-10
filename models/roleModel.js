const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
sequelize.sync({force: false}).then(() => {
   console.log('Role false created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});



module.exports = Role;
