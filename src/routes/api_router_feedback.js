const express = require('express');
const router = express.Router()

//import controller
const feedback_controller = require('../controllers/feedback_controller');

//import middlewares
const CountPages = require('../middlewares/count_pages');
const authManager = require('../middlewares/authManager');
const auth = require('../middlewares/auth');

//crud cart
router.get('/', auth, CountPages, feedback_controller.get);
router.post('/', auth, feedback_controller.post);
router.put('/', authManager, feedback_controller.put);
router.delete('/',auth, feedback_controller.delete);

//advance search
router.get('/id', auth, feedback_controller.feedback_id);
router.get('/user', authManager ,CountPages, feedback_controller.feedback_user);

module.exports = router