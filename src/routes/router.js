const express = require('express');
const Controller = require('../controllers/controller');

const router = express.Router();

router.use('/api', Controller.helloWorld);

module.exports = router;
