const express = require('express');
const router = express.Router();

const publicViews = require('../controllers/index-public-views-controller');

/* GET home page. */
router.get('/', publicViews.index );
router.get('/singup', publicViews.singup );
router.get('/about', publicViews.about );

module.exports = router;
