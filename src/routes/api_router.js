const express = require('express');
const router = express.Router();

const books_controller = require('../controllers/books_controller');
const CountPages = require('../middlewares/count_pages');

router.get('/books',CountPages , books_controller.get_books);
router.get('/books/id', books_controller.get_id_book);
router.get('/books/genre', CountPages , books_controller.get_books_genres);
router.get('/books/search', CountPages , books_controller.get_search_book);

module.exports = router;