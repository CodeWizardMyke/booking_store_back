const express = require('express');
const router = express.Router();

//controller import for router
const books_controller = require('../controllers/books_controller');

//middlewares import for router
const CountPages = require('../middlewares/count_pages');
const multer_upload_img_book = require('../middlewares/multer_upload_img_book');
const filterEmptyFields = require('../middlewares/filterEmptyFields');
const authManager = require('../middlewares/authManager');

//functions import for crud books in router
const validator_fields_books = require('../functions/validator_fields_books');
const validator_fields_book_put = require('../functions/validator_fields_book_put');

//crud do modelo books
router.get('/', CountPages, books_controller.get_books);
router.post('/', authManager, multer_upload_img_book.single('front_cover'), validator_fields_books, books_controller.post_book);
router.put('/', authManager, multer_upload_img_book.single('front_cover'), filterEmptyFields, validator_fields_book_put, books_controller.pull_book);
router.delete('/', authManager, books_controller.delete_book);

//pesquisas avancadas do modelo books
router.get('/id', books_controller.get_id_book);
router.get('/genre', CountPages, books_controller.get_books_genres);
router.get('/search', CountPages, books_controller.get_search_book);

module.exports = router;