const { Op } = require('sequelize');
const {Books} = require('../database/models');

module.exports = {
    get_books: async (req,res) => {
        try {
            const {page, size} = req.headers

            const data = await Books.findAndCountAll({
                where: {status:'active'},
                limit: Number(size),
                offset: Number(size) * ( Number(page) -1)
            });

            return res.send(data);
        } catch (error) {
            res.send(error);
        }
    },
    get_books_genres: async (req,res) => { 
        try {
            const {genre, page, size} = req.headers
    
            const data = await Books.findAndCountAll({
                where: {status:'active', genre:genre },
                limit: Number(size),
                offset: Number(size) * ( Number(page) -1)
            })
    
            return res.send(data)
        } catch (error) {
            res.send(error);
        }
    },
    get_id_book: async (req, res) => {
        try {
            const {id_books} = req.headers

            const data = await Books.findByPk(Number(id_books))

            return res.send(data)

        } catch (error) {
            res.send(error);
        }
    },
    get_search_book: async (req, res) => {
        try {
            const {key, page, size} = req.headers

            const data = await Books.findAndCountAll({
                where: {status:'active', title:{[Op.like]: `%${key}%` }},
                limit: Number(size),
                offset: Number(size) * ( Number(page) -1)
            })
    
            return res.send(data)
        } catch (error) {
            res.send(error);
        }
    },
};