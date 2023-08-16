const express = require('express');
const router = express.Router()

//import controller
const cart_controller = require('../controllers/cart_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');
const auth = require('../middlewares/auth');
const validator_fields_cart = require('../functions/validator_fields_cart');

//crud cart
router.get('/', auth, CountPages, cart_controller.get);
router.post('/',auth, validator_fields_cart.post, cart_controller.post);
router.put('/', auth, validator_fields_cart.put,cart_controller.put);
router.delete('/', auth, cart_controller.delete);

//advance search cart
router.get('/id', auth, cart_controller.get_cart_by_id);
router.get('/user', auth, CountPages, cart_controller.get_all_user_cart);
router.get('/pending', auth, CountPages, cart_controller.get_all_user_cart_pending);
router.get('/approved', auth, CountPages, cart_controller.get_all_user_cart_approved);

module.exports = router