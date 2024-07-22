const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post("/users/register", authController.signUp);

module.exports = router;