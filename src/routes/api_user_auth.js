const express = require('express')
const router = express.Router();

const user_login_controller = require('../controllers/users_login_controller');

const validator_fields_user_login = require('../functions/validator_fields_user_login');
const auth = require('../middlewares/auth')

router.post('/login', validator_fields_user_login, user_login_controller.login_user);
router.post('/logout', auth, user_login_controller.logout);

module.exports = router;