const { Payment, Users } = require('../database/models');
const PaymentNewItem = require('../functions/PaymentNewItem');

const {validationResult} = require('express-validator')

module.exports = {
    //crud model user information
    get: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const response = await Payment.findAndCountAll({
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
                return res.json(catchErrors)
            };

            const paymentItem = await PaymentNewItem(req);
            const response = await Payment.create(paymentItem)

            return res.json(response)
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
                return res.json(catchErrors)
            };

            const {payment_id} = req.body
            const response = await Payment.findByPk(payment_id);

            await response.update(req.body)
            await response.save()

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar atualizar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    delete: async (req, res) => {
        try {
            const {id_payment} = req.headers

            const response = await Payment.destroy({
                where:{ 
                    id_payment: id_payment,
                    status: 'pending'},
            })
            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar deletar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },

    //advanced search user information
    payment_id: async (req, res) => {
        try {
            const {id_payment} = req.headers;
            console.log(id_payment)
            const id_token = req.token_decoded.id;

            const response = await Payment.findByPk(id_payment)
            if( Number(response.fk_id_user) !== Number(id_token) ){
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
    payment_user: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;
            const id_token = req.token_decoded.id;

            const response = await Payment.findAndCountAll({
                where:{fk_id_user:id_user},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            if( Number(response.fk_id_user) !== Number(id_token)){
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