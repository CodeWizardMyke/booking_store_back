const express = require('express');
const router = express.Router()

//import controller
const cart_controller = require('../controllers/cart_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages')

//crud cart
router.get('/', CountPages, cart_controller.get);
router.post('/', cart_controller.post);
router.put('/', cart_controller.put);
router.delete('/', cart_controller.delete);

//advance search cart
router.get('/id', CountPages, cart_controller.get_id);

module.exports = router