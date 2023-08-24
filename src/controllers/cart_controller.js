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
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors)
            };

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
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors)
            };
            
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

            const { id } = req.token_decoded;

            //verificar se chegou algum id válido para esta solicitação
            if(!id){ return res.status(401).json({msg:'Error token inválido imposível processar os dados'} )}

            // deve se verificar se primeiro é um admnistrador que está fazendo a solicitação
            const responseUser = await Users.findByPk(id)

            if(responseUser.admin === 'true'){
                const authAdminCart = await Cart.findAndCountAll({
                    where:{ fk_id_user: id_user, status:'pending' },
                    limit: Number(size),
                    offset: Math.ceil(  Number(size) * (Number(page) -1) )
                })
                // se sim retorne todos os carrinhos do usuário baseado no id que ele forneçeu
                return res.status(200).json(authAdminCart)
            }

            //caso nao seja admin extraia o id do usuário do próprio token e retorne seu carrinho
            const userCart = await Cart.findAndCountAll({
                where:{fk_id_user: id, status: 'pending'},
                limit:Number(size),
                offset: Math.ceil( Number(size) * (Number(page) -1 ) ) 

            })

            return res.status(200).json(userCart)

        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_all_user_cart_approved: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;

            const { id } = req.token_decoded;

            //verificar se chegou algum id válido para esta solicitação
            if(!id){ return res.status(401).json({msg:'Error token inválido imposível processar os dados'} )}

            // deve se verificar se primeiro é um admnistrador que está fazendo a solicitação
            const responseUser = await Users.findByPk(id)

            if(responseUser.admin === 'true'){
                const authAdminCart = await Cart.findAndCountAll({
                    where:{ fk_id_user: id_user, status:'approved' },
                    limit: Number(size),
                    offset: Math.ceil(  Number(size) * (Number(page) -1) )
                })
                // se sim retorne todos os carrinhos do usuário baseado no id que ele forneçeu
                return res.status(200).json(authAdminCart)
            }

            //caso nao seja admin extraia o id do usuário do próprio token e retorne seu carrinho
            const userCart = await Cart.findAndCountAll({
                where:{fk_id_user: id, status: 'approved'},
                limit:Number(size),
                offset: Math.ceil( Number(size) * (Number(page) -1 ) ) 

            })

            return res.status(200).json(userCart)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
}