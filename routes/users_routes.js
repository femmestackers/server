const express = require('express');
const router = express.Router();

const {
    userAuthenticated
} = require('../controllers/smoothies_controller');

router.use(userAuthenticated);

module.exports = router;