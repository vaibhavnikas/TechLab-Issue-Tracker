const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.use('/users', require('./users'));

// put every route behind authentication, only user/sign-in, user/sign-up routes are accessible when not signed in
router.use(passport.checkAuthentication);

router.get('/', homeController.home);
router.use('/project', require('./project'));

module.exports = router;