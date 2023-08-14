const express = require('express');
const router = express.Router()

//import controller
const payment_controller = require('../controllers/payment_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');

//crud cart
router.get('/', CountPages, payment_controller.get);
router.post('/', payment_controller.post);
router.put('/', payment_controller.put);
router.delete('/', payment_controller.delete);

//advance search
router.get('/id', payment_controller.payment_id);
router.get('/user', CountPages, payment_controller.payment_user);

module.exports = router