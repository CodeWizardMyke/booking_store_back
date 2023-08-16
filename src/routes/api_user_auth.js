const express = require('express')
const router = express.Router();

const user_login_controller = require('../controllers/users_login_controller');

const validator_fields_user_login = require('../functions/validator_fields_user_login');

router.get('/', validator_fields_user_login, user_login_controller.login_user);

module.exports = router;