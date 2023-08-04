const { Books } = require('../src/database/models')

const books = Books.findAll()

books
    .then( response => console.log(response) )
    .catch( error => console.log(error))
