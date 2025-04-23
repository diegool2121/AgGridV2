const express = require('express');
const router = express.Router();
const userExController = require('../controllers/userEx.controller');

router.get('/', userExController.getAllUsersEx);
router.post('/', userExController.createUserEx);
router.delete('/', userExController.deleteAllUsersEx);

module.exports = router;
