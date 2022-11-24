const controller = require('../controller/UserController');
const express = require('express');
const router = express.Router();
const authorizationHandler = require("../middleware/AuthorizationHandler")

// router.get('/users',authorizationHandler,controller.getAll);
// router.get('/users/:userId',controller.getById);
// router.post('/register',controller.create);
// router.post('/login',controller.authenticate);
// router.post('/logout',controller.logOut);
// router.post('/users/block',authorizationHandler,controller.blockAll);
// router.post('/users/unblock',authorizationHandler,controller.unblockAll);
// router.delete('/users',authorizationHandler,controller.deleteAll);

router.get('/users',controller.getAll);
router.get('/users/:userId',controller.getById);
router.post('/register',controller.create);
router.post('/login',controller.authenticate);
router.post('/logout',controller.logOut);
router.post('/users/block',controller.blockAll);
router.post('/users/unblock',controller.unblockAll);
router.delete('/users',controller.deleteAll);

module.exports = router;