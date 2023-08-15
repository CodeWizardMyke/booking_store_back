const express = require('express');
const router = express.Router()

//import controller
const token_invalid_controller = require('../controllers/token_invalid_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');

//crud cart
router.get('/', CountPages, token_invalid_controller.get);
router.post('/', token_invalid_controller.post);
router.delete('/', token_invalid_controller.delete);


module.exports = router