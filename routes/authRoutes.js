const express = require('express');
const router = express.Router();
const User=require('../models/userModel');
const Role=require('../models/roleModel');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtutils');

const jwt = require('jsonwebtoken');
router.route('/login').post(login);
router.route('/signup').post(signup);


async function login(req, res) {
  const  email  = req.body.email;
  const  password  = req.body.password;

  try {
     const user = await User.findOne({ where: { email } });

    // If the user is not found or the password is incorrect
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    else
    {
    const token = jwtUtils.generateToken({ email });
    res.json({ token });
    }
 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during login.' });
  }
}

async function signup (req, res)  {
  const { name, email, password,role, bossid } = req.body;

  if (!name || !email || !password || !role || !bossid) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }


const hashedPassword = bcrypt.hashSync(password, 10);
 User.create({
       username: name,
       email: email,
       password: hashedPassword,
       role: role, 
       boss: bossid,
       userID: "id" + Math.random().toString(16).slice(2),
       peopleList: "",
   }).then(ress => {
       console.log('res');
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });


   Role.create({
       name: name,
       position: role,
   }).then(ress => {
      //  res.send(ress);
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });
   if(bossid != '-1')
   {
    try {
     isBossIdPresent(bossid).then(async isUnique => {
    if (!isUnique) {
       res.status(400).send("User already exists");
    throw new Error("User already exists");
    }
    else
    {
      try{
        const user = await User.findByPk(bossid);
        
          var tempid=User.id;
    user.peopleList += tempid;
      // If the user is not found, send a 404 Not Found response
      console.log(user);
      }
     catch(error){
        console.log(error);
     }
    }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during login.' });
  }
   }

const accessToken = jwt.sign({email}, 'secret-key',{ expiresIn: '30d' });


    res.send(accessToken);

};

function isIdUnique (email) {
    return User.count({ where: { email: email } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
}

function isBossIdPresent (bossid) {
    return User.count({ where: { id: bossid } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
}

module.exports = router;
