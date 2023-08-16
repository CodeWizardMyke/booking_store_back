const express = require('express');
const router = express.Router()

//import controller
const token_invalid_controller = require('../controllers/token_invalid_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');
const auth = require('../middlewares/auth');
const authManager = require('../middlewares/authManager');
const validator_fields_token_invalid = require('../functions/validator_fields_token_invalid');

//crud cart
router.get('/', authManager, CountPages, token_invalid_controller.get);
router.post('/', auth,  validator_fields_token_invalid, token_invalid_controller.post);
router.delete('/', authManager, token_invalid_controller.delete);

module.exports = router