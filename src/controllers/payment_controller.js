const { Payment } = require('../database/models');
const PaymentNewItem = require('../functions/PaymentNewItem');

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
            //função para criar um objeto item com estruturas predefinidas externalizada para a função PaymentNewItem: 
            //Função PaymentNewItem é asyncrona recebe req, e retorna um objeto no formato do modelo Payment:
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
            const { payment_id, payment_type,  status} = req.body;
            const response = await Payment.findByPk(payment_id);
            
            response.api_payment_type = payment_type
            response.status = status

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
            const response = await Payment.findByPk(id_payment)

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

            const response = await Payment.findAndCountAll({
                where:{fk_id_user:id_user},
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
}