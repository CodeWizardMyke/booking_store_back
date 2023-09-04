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

            const response = await Books.findAndCountAll({
                where: {status:'active'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1) )
            });
            return res.json(response);
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
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
            req.body.kindle_price = Number(req.body.kindle_price)
            req.body.common_price = Number(req.body.common_price)
            req.body.special_price = Number(req.body.special_price)

            const response = await Books.create(req.body);
            res.json(response);
        } catch (error) {
            const msg = {Error:'Erro ao tentar adicionar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    pull_book: async (req, res) => {
        try {
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                //caso ocorra algum erro remova a imagem recebida e retorne os erros para o cliente
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors);
            };
            const response = await Books.findByPk(req.body.id_books);
            
            //caso seja passado uma nova imagem como parâmetro remova a antiga deste produto
            if(req.file && response){
                deleteBookImage(response.front_cover)
                req.body.front_cover = req.file.filename;
            }
            await response.update(req.body);
            await response.save();

            res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar atualizar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    delete_book: async (req, res) => {
        try {
            // por questões de segurança de dados é importante não deletar os produtos da aplicação
            const {id_books, status} = req.body;
            
            const response = await Books.findByPk(id_books);
            status ? response.status = status : '';

            await response.save();
            return res.json(response);
        } catch (error) {
            const msg = {Error:'Erro ao tentar deletar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        };
    },

    //advanced search on model Books
    get_books_genres: async (req,res) => { 
        try {
            const {genre, page, size} = req.headers
    
            const response = await Books.findAndCountAll({
                where: {status:'active', genre:genre },
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1) )
            })
    
            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_id_book: async (req, res) => {
        try {
            const {id_books} = req.headers

            const response = await Books.findByPk(Number(id_books))

            return res.json(response)

        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_search_book: async (req, res) => {
        try {
            const {key, page, size} = req.headers

            const response = await Books.findAndCountAll({
                where: {status:'active', title:{[Op.like]: `%${key}%` }},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1) )
            })
    
            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
};