const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');

// create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.newUserForm);
router.post('/adduser', userController.addNewUser);

module.exports = router;