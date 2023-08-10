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
router.get('/id', cart_controller.get_cart_by_id);
router.get('/user', CountPages, cart_controller.get_all_user_cart);
router.get('/pending', CountPages, cart_controller.get_all_user_cart_pending);
router.get('/approved', CountPages, cart_controller.get_all_user_cart_approved);

module.exports = router