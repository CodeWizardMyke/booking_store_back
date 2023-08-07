const express = require('express');
const router = express.Router();

//controller import for router
const books_controller = require('../controllers/books_controller');

//middlewares import for router
const CountPages = require('../middlewares/count_pages');
const multer_upload_img_book = require('../middlewares/multer_upload_img_book');

//functions import for crud books in router
const  validator_fields_books = require('../functions/validator_fields_books');
const image_istrue_check_format = require('../functions/image_istrue_check_format');

//crud do modelo books
router.get('/books', CountPages, books_controller.get_books);
router.post('/books', multer_upload_img_book.single('front_cover'), validator_fields_books, books_controller.post_book);
router.put('/books', multer_upload_img_book.single('front_cover'), image_istrue_check_format, books_controller.pull_book);
router.delete('/books', books_controller.delete_book);

//pesquisas avancadas do modelo books
router.get('/books/id', books_controller.get_id_book);
router.get('/books/genre', CountPages, books_controller.get_books_genres);
router.get('/books/search', CountPages, books_controller.get_search_book);

module.exports = router;