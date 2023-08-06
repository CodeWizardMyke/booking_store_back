const express = require ('express');
const router = express.Router();

const testingController = require('../controllers/testingController.js');

router.get('/cart', testingController.cart);
router.get('/payment', testingController.payment);
router.get('/feedback', testingController.feedback);
router.get('/bestsaler', testingController.bestsaler);
router.get('/books', testingController.books);
router.get('/token', testingController.token);
router.get('/user', testingController.user);
router.get('/user/info', testingController.user_info);

module.exports = router;