const { Books, Cart, Users } = require('../src/database/models')

const Users = Cart.findAll()

Users
    .then( response => console.log(response) )
    .catch( error => console.log(error))
