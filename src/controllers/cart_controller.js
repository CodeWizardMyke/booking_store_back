const { Cart, Books} = require('../database/models');

//import bibliotecas js
const { validationResult } = require('express-validator');
const CalculateCartPrice = require('../functions/CalculateCartPrice');

module.exports = {

    //crud model user information
    get: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const itemsCart = await Cart.findAndCountAll({
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(itemsCart)
        } catch (error) {
            res.json(error)
        }
    },
    post: async (req, res) => {
        try {
            const {id_user, id_books, qtd_items, type_selected, user_cpf} = req.headers

            const book = await Books.findByPk(id_books);

            //function para calcular os valores do livro referente ao tipo selecionado e quantidade
            let {request_price, item_price} = CalculateCartPrice(book, type_selected, qtd_items);

            let cartNewItem = {
                item_price,
                request_price,
                status:'pending',
                status_delivery:'',
                qtd_items,
                type_selected,
                user_cpf: user_cpf ? user_cpf : '',
                fk_id_books: id_books,
                fk_id_user: id_user
            }

            const itemCart = await Cart.create(cartNewItem);

            return res.json(itemCart)
        } catch (error) {
            res.json(error)
        }
    },
    put: async (req, res) => {
        try {
            const {id_cart, type_selected, qtd_items} = req.body;
            
            const itemCart = await Cart.findOne({where:{id_cart:id_cart}});
            const book = await Books.findByPk(itemCart.fk_id_books);
            
            let {request_price, item_price} = CalculateCartPrice(book, type_selected, qtd_items);
            
            await itemCart.update({
                request_price,
                item_price,
                qtd_items: Number(qtd_items),
                type_selected
            })

            return res.json(itemCart)
        } catch (error) {
            return res.json(error)
        }
    },
    delete: async (req, res) => {
        try {
            const {id_cart} = req.headers;

            const itemCart = await Cart.destroy({
                where:{id_cart:id_cart, status: 'pending'},
            })

            return res.json(itemCart)
        } catch (error) {
            res.json(error);
        }
    },

    //advanced search user information
    get_cart_by_id: async (req, res) => {
        try {
            const {id_cart} = req.headers;

            const itemCart = await Cart.findByPk(id_cart)

            return res.json(itemCart)
        } catch (error) {
            res.json(error);
        }
    },
    get_all_user_cart: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;

            const itemCart = await Cart.findAndCountAll({
                where:{fk_id_user:id_user},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(itemCart)
        } catch (error) {
            res.json(error);
        }
    },
    get_all_user_cart_pending: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;

            const itemCart = await Cart.findAndCountAll({
                where:{fk_id_user:id_user, status:'pending'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(itemCart)
        } catch (error) {
            res.json(error);
        }
    },
    get_all_user_cart_approved: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;

            const itemCart = await Cart.findAndCountAll({
                where:{fk_id_user:id_user, status:'approved'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(itemCart)
        } catch (error) {
            res.json(error);
        }
    },
}