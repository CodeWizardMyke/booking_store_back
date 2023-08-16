const express = require('express');
const router = express.Router()

//import controller
const payment_controller = require('../controllers/payment_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');
const auth = require('../middlewares/auth');
const authManager = require('../middlewares/authManager');
const validator_fields_payment = require('../functions/validator_fields_payment');

//crud cart
router.get('/', authManager, CountPages, payment_controller.get);
router.post('/', auth, validator_fields_payment.post, payment_controller.post);
router.put('/', authManager, validator_fields_payment.put, payment_controller.put);
router.delete('/', authManager, payment_controller.delete);

//advance search
router.get('/id', auth, payment_controller.payment_id);
router.get('/user', auth, CountPages, payment_controller.payment_user);

module.exports = router