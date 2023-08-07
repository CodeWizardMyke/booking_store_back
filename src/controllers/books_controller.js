//model books import - database mysql
const {Books} = require('../database/models');

//sequelize's like operator for advanced string searches
const { Op } = require('sequelize');

//middlewares using for cheking fields
const { validationResult }= require('express-validator');
const deleteBookImage = require('../functions/deleteBookImage');

module.exports = {

    //crud on model boooks
    get_books: async (req,res) => {
        try {
            const {page, size} = req.headers

            const data = await Books.findAndCountAll({
                where: {status:'active'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1) )
            });

            return res.send(data);
        } catch (error) {
            res.send(error);
        }
    },
    post_book: async (req, res) => {
        try {
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors)
            };

            req.body.front_cover = req.file.filename;
            req.body.status = 'active';

            const insertBook = await Books.create(req.body);
            res.send(insertBook);

        } catch (error) {
            res.send(error);
        }
    },
    pull_book: async (req, res) => {
        try {
            const {id_books} = req.headers;

            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                //caso ocorra algum erro remova a imagem recebida e retorne os erros para o cliente
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors);
            };
            
            const book = await Books.findByPk(id_books);
            
            //caso seja passado uma nova imagem como parâmetro remova a antiga deste produto
            if(req.file && book){
                deleteBookImage(book.front_cover)
                req.body.front_cover = req.file.filename;
            }
            await book.update(req.body);
            await book.save();

            res.send(book)
        } catch (error) {
            res.send(error);
        }
    },
    delete_book: async (req, res) => {
        try {
            // por questões de segurança de dados é importante não deletar completamente os produtos para não aconteçer errors na contabilidade assim optei por apenas desativar o produto.
            const {id_books} = req.headers;
            
            let book = await Books.findByPk(id_books);
            let {status} = book;
            
            if(status == 'active'){
                book.status = 'disabled';
            }else{
                book.status = 'active';
            };
            
            await book.update();
            await book.save();

            return res.send(book);

        } catch (error) {
            return res.send(error);
        };
    },

    //advanced search on model Books
    get_books_genres: async (req,res) => { 
        try {
            const {genre, page, size} = req.headers
    
            const data = await Books.findAndCountAll({
                where: {status:'active', genre:genre },
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1) )
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
                offset: Math.ceil( Number(size) * ( Number(page) -1) )
            })
    
            return res.send(data)
        } catch (error) {
            res.send(error);
        }
    },
};