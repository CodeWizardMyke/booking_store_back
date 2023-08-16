const express = require('express');
const router = express.Router();

//controller import for router
const users_controllers = require('../controllers/users_controller');

//middlewares import
const CountPages = require('../middlewares/count_pages');
const multer_upload_img_users = require('../middlewares/multer_upload_img_users');
const filterEmptyFields = require('../middlewares/filterEmptyFields');
const auth = require('../middlewares/auth');

//functions import
const validator_fields_users = require('../functions/validator_fields_users');
const validator_fields_users_put = require('../functions/validator_fields_user_put');
const authManager = require('../middlewares/authManager');

router.get('/', authManager, CountPages, users_controllers.get_users);
router.post('/', multer_upload_img_users.single('user_avatar'), validator_fields_users, users_controllers.post_user);
router.put('/', auth, multer_upload_img_users.single('user_avatar'), filterEmptyFields, validator_fields_users_put, users_controllers.put_user);
router.delete('/',authManager, users_controllers.delete_user);

router.get('/id', auth, users_controllers.get_user_id);
router.get('/email', authManager, users_controllers.get_user_email);

module.exports = router;