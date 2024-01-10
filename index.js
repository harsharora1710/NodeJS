const express=require('express');
var authRoutes = require('./routes/authRoutes');
var userRoutes = require('./routes/userRoutes');
const bp=require('body-parser');
const sequelize = require('./utils/database');

const app=express();
app.use(bp.json());
const PORT =process.env.PORT || 2000;
console.log(PORT);
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:',PORT );
});



sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => console.error('Error syncing database:',error));


app.use('/auth', authRoutes);
app.use('/user', userRoutes);