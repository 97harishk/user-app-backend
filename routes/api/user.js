const express = require('express')
const router = express.Router()

const login_registerController = require('../../controllers/api/auth_controller')

router.post('/login', login_registerController.login );
router.post('/autoLogin/:userId', login_registerController.autoLogin );
router.post('/register', login_registerController.register );
router.post('/update/:userId', login_registerController.update );
router.get('/users', login_registerController.users );
router.post('/delete/:userId', login_registerController.delete );

module.exports = router;