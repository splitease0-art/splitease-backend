const router = require('express').Router();
const  controller = require('../controller')
const {passwordValidation} = require('../middlewares/password-validator');
const JWT = require('../middlewares/jwt-auth');




router.post('/sign-up',passwordValidation, controller.signUp.userSignUp);  

router.post('/sign-in', controller.signIn.userSignIn);

















module.exports = router;