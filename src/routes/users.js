const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', UserController.getAllUsers);
router.get('/current', verifyToken, UserController.getCurrentUser);
router.get('/:id', UserController.getUserById);
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);

module.exports = router;
