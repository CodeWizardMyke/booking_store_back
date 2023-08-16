const { Cart, Books, Users} = require('../database/models');

//import bibliotecas js
const { validationResult } = require('express-validator');
const CalculateCartPrice = require('../functions/CalculateCartPrice');
const CartNewItem = require('../functions/CartNewItem');

module.exports = {
    //crud model user information
    get: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const response = await Cart.findAndCountAll({
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    post: async (req, res) => {
        try {
            const bookResponse = await Books.findByPk(req.body.id_books);

            const cartItem = CartNewItem(req, bookResponse);
            const itemCart = await Cart.create(cartItem);

            return res.json(itemCart);
        } catch (error) {
            const msg = {Error:'Erro ao tentar adicionar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    put: async (req, res) => {
        try {
            const {type_selected, qtd_items} = req.body;
            
            const cartResponse = await Cart.findByPk(req.body.id_cart)
            const bookResponse = await Books.findByPk(cartResponse.fk_id_books);
            
            const {request_price, item_price} = CalculateCartPrice(bookResponse, type_selected, qtd_items);
            
            await cartResponse.update({
                request_price:request_price,
                item_price:item_price,
                qtd_items: Number(qtd_items),
                type_selected:type_selected
            })
            return res.json(cartResponse)
        } catch (error) {
            const msg = {Error:'Erro ao tentar atualizar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    delete: async (req, res) => {
        try {
            const {id_cart} = req.headers;

            const response = await Cart.destroy({
                where:{id_cart:id_cart, status: 'pending'},
            })
            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },

    //advanced search user information
    get_cart_by_id: async (req, res) => {
        try {
            const {id_cart} = req.headers;
            const id_token = req.token_decoded.id;

            const response = await Cart.findByPk(id_cart)
            if( Number(id_token) !== Number(response.fk_id_user)){
                const isAdminAuth  = await Users.findOne({ where: { id_user: id_token, admin: 'true' }})
                if(!isAdminAuth){
                    return res.status(400).json({msg:'Autorização negada! dados incorretos'})
                }
            }

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_all_user_cart: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;
            const id_token = req.token_decoded.id;

            const response = await Cart.findAndCountAll({
                where:{fk_id_user:id_user},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            if( Number(id_token) !== Number(response.fk_id_user)){
                const isAdminAuth  = await Users.findOne({ where: { id_user: id_token, admin: 'true' }})
                if(!isAdminAuth){
                    return res.status(400).json({msg:'Autorização negada! dados incorretos'})
                }
            }

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_all_user_cart_pending: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;
            const id_token = req.token_decoded.id;

            const response = await Cart.findAndCountAll({
                where:{fk_id_user:id_user, status:'pending'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })
            
            if( Number(id_token) !== Number(response.fk_id_user)){
                const isAdminAuth  = await Users.findOne({ where: { id_user: id_token, admin: 'true' }})
                if(!isAdminAuth){
                    return res.status(400).json({msg:'Autorização negada! dados incorretos'})
                }
            }
                        
            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_all_user_cart_approved: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;
            const id_token = req.token_decoded.id;

            const response = await Cart.findAndCountAll({
                where:{fk_id_user:id_user, status:'approved'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            if( Number(id_token) !== Number(response.fk_id_user)){
                const isAdminAuth  = await Users.findOne({ where: { id_user: id_token, admin: 'true' }})
                if(!isAdminAuth){
                    return res.status(400).json({msg:'Autorização negada! dados incorretos'})
                }
            }

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
}