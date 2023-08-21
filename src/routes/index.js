const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const urlBase = {url:'http://localhost:3000/'}
  res.render('index',{urlBase} );
});

module.exports = router;
