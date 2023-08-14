const express = require('express');
const router = express.Router()

//import controller
const feedback_controller = require('../controllers/feedback_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');

//crud cart
router.get('/', CountPages, feedback_controller.get);
router.post('/', feedback_controller.post);
router.put('/', feedback_controller.put);
router.delete('/', feedback_controller.delete);

//advance search
router.get('/id', feedback_controller.feedback_id);
router.get('/user', CountPages, feedback_controller.feedback_user);

module.exports = router