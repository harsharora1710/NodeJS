const User = require('../models/userModel');
const Role = require('../models/roleModel');

async function createUser(req, res) {
    const {name,email,password,role,myid} =req.body;
     if (!name || !email || !password || !role || !myid) {
    res.status(400);
    throw new Error("User can't be created");
  }

  User.create({
       username: name,
       email: email,
       password: password,
       role: role, 
       boss: myid,
       userID: "id" + Math.random().toString(16).slice(2),
       peopleList: "",
   }).then(ress => {
       console.log('res');
       res.send(ress);
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });
}

async function getUserInfo(req, res) {
   const  id  = req.params.id;

  if (!id) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  try {
    // Find the user by ID in the database
    const user = await User.findByPk(id);

    if (!user) {
      // If the user is not found, send a 404 Not Found response
      console.log(id);
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, send the user data in the response
    res.json(user);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error finding user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteUser(req, res) {
   const  id  = req.params.id;

  if (!id) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  try {
    // Find all users with the specified bossId
    const users = await User.findAll({
      where: { id: id },
    });
     // If no users are found, send a response
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No user exist with such id'});
    }
    User.destroy({
    where: 
        { id: id },
    });
   const usersafterop = await User.findAll({ });

    // If users are found, send the users data in the response
    res.json(usersafterop);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Error finding user:' });
  }
}

async function getUserList(req, res) {
  const  id  = req.params.id;

  if (!id) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  try {
    // Find all users with the specified bossId
    const users = await User.findAll({
      where: { boss: id },
    });

    // If no users are found, send a response
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found working under him' });
    }

    // If users are found, send the users data in the response
    res.json(users);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error finding users by bossId:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { createUser,getUserInfo, getUserList, deleteUser };
