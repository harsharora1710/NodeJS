const express = require('express');
const userController = require('../controllers/usercontroller');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/self/:id',protect, userController.getUserInfo);
router.get('/list/:id',protect ,userController.getUserList);
router.post('/create',protect,userController.createUser);
router.delete('/delete/:id',protect,userController.deleteUser);






function  protect  (req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, 'secret-key');
    req.user = user;
     next();
  } catch (error) {
    res.status(401).json({
        status: 'failed',
        message: 'Unauthorized!',
      });
  }
};





module.exports = router;
