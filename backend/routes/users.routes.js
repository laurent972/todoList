const express = require('express');
const cookieParser = require('cookie-parser')
const authController = require('../controllers/auth.controller');
const userController = require ('../controllers/user.controller');
const router = express.Router();

router.use(cookieParser())

router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;