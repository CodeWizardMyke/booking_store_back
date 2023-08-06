const {Users, User_information, Payment, Feedback, Books, Bestsaler, Cart} = require('../src/database/models');

async function test(){

    let associateTesting = await Books.findAll({where:{id_books:6},include:'cart_user',required:true})

    console.log(associateTesting)
    
}test();