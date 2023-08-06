const { Users, User_information, Cart, Payment, Feedback, Bestsaler, Books, Token_invalid} = require('../database/models');

const index = {
    cart: async (req, res) => {
        try {
            const cartTest = await Cart.findAll()        
            return res.send(cartTest);
        } catch (error) {
            return res.send(error);
        }
    },
    payment: async (req, res) => {
        try {
            const paymentTest = await Payment.findAll();
            return res.send(paymentTest);
        } catch (error) {
            return res.send(error);
        }
    },
    feedback: async (req,res) => {
        try {
            const feedback = await  Feedback.findAll()
            res.send(feedback)
        } catch (error) {
            return res.send(error);
        }
    },
    bestsaler: async (req,res) => {
        try {
            const bestsaler = await  Bestsaler.findAll()
            res.send(bestsaler)
        } catch (error) {
            return res.send(error);
        }
    },
    books: async (req,res) => {
        try {
            const books = await  Books.findAll()
            res.send(books)
        } catch (error) {
            return res.send(error);
        }
    },
    token: async (req,res) => {
        try {
            const token = await  Token_invalid.findAll()
            res.send(token)
        } catch (error) {
            return res.send(error);
        }
    },
    user: async (req,res) => {
        try {
            const user = await  Users.findAll()
            res.send(user)
        } catch (error) {
            return res.send(error);
        }
    },
    user_info: async (req,res) => {
        try {
            const user_information = await  User_information.findAll()
            res.send(user_information)
        } catch (error) {
            return res.send(error);
        }
    }

}

module.exports = index