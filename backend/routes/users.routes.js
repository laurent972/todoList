const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post("/", authController.signUp);

module.exports = router;