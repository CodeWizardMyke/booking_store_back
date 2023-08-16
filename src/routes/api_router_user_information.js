const express = require('express');
const router = express.Router()

//import controller
const user_information_controller = require('../controllers/user_information_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages')
const auth = require('../middlewares/auth');

//import functions 
const validation_fields_user_information = require('../functions/validator_fields_user_information');
const validator_fields_user_information_PUT = require('../functions/validator_fields_user_information_PUT');
const filterEmptyFields = require('../middlewares/filterEmptyFields');

router.get('/', auth, CountPages, user_information_controller.get_user_information);
router.post('/', auth, validation_fields_user_information, user_information_controller.post_user_information);
router.put('/', auth, filterEmptyFields,validator_fields_user_information_PUT, user_information_controller.put_user_information);
router.delete('/', auth, user_information_controller.delete_user_information);

module.exports = router