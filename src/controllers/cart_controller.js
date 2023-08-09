const { Cart, Books } = require('../database/models');

//import bibliotecas js
const { validationResult } = require('express-validator');
const CalculateCartPrice = require('../functions/CalculateCartPrice');

module.exports = {

    //crud model user information
    get: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const data = await Cart.findAndCountAll({
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(data)
        } catch (error) {
            res.json(error)
        }
    },
    post: async (req, res) => {
        try {
            const {id_user, id_books, qtd_items, type_selected, user_cpf} = req.headers

            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                return res.json(catchErrors)
            }

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


            const insertUser = await Cart.create(cartNewItem);

            return res.json(insertUser)
        } catch (error) {
            res.json(error)
        }
    },
    put: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                return res.json(catchErrors)
            }
            
            const userSearch = await Cart.findOne({where:{fk_id_user:id_user}});
            await userSearch.update(req.body)

            return res.json(req.body)
        } catch (error) {
            return res.json(error)
        }
    },
    delete: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const dataDeleted = await Cart.destroy({where:{fk_id_user:id_user}})

            return res.json(dataDeleted)
        } catch (error) {
            res.json(error);
        }
    },

    //advanced search user information
    get_id: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const userSearch = await Users.findOne({where:{fk_id_user:id_user}});

            return res.json(userSearch)
        } catch (error) {
            res.json(error);
        }
    },
}