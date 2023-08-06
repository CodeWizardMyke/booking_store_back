const { Books, Cart } = require('../src/database/models')

const books = Cart.findAll()

books
    .then( response => console.log(response) )
    .catch( error => console.log(error))
