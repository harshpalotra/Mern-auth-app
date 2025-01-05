const { signup, login } = require('../controllers/Auth.controller');
const { singupValidation, loginValidation } = require('../Middlewares/Authmiddleware');

const router = require('express').Router();
router.post('/login', loginValidation, login)
router.post('/signup', singupValidation, signup)

module.exports = router;