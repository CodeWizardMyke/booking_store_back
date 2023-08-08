const express = require('express');
const router = express.Router()

//import controller
const user_information_controller = require('../controllers/user_information_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages')

//import functions 
const validation_fields_user_information = require('../functions/validator_fields_user_information');


router.get('/', CountPages, user_information_controller.get_user_information);
router.post('/', validation_fields_user_information, user_information_controller.post_user_information);
router.put('/', user_information_controller.put_user_information);
router.delete('/', user_information_controller.delete_user_information);

module.exports = router