const express = require('express');
const Controller = require('../controllers/user.controller');
const middleware = require('../middleware/middleware')

const router = express.Router();

router.get('/user', Controller.getUser);
router.get('/userdetail/:id', middleware.verifyToken, Controller.getDetailUser);
router.post('/register', Controller.register);
router.post('/Login', Controller.login);
router.delete('/delete/:id', Controller.deleteUser);
router.put('/update/:id', Controller.updateUser);

module.exports = router;