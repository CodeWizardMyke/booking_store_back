const express = require('express');
const router = express.Router()

//import controller
const token_invalid_controller = require('../controllers/token_invalid_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');
const auth = require('../middlewares/auth');
const authManager = require('../middlewares/authManager');

//crud cart
router.get('/', authManager, CountPages, token_invalid_controller.get);
router.post('/', auth, token_invalid_controller.post);
router.delete('/', authManager, token_invalid_controller.delete);


module.exports = router