const { Payment, Cart, Books } = require('../database/models');

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
            res.json(error)
        }
    },
    post: async (req, res) => {
        try {
            const {id_cart, payment_id, payment_type, merchant_order_id, status} = req.headers;

            // os dados req.headers payment_id entre outros serão obtidos apartir do consumo da api do "mercado pago api" 
            // no seu app front end repase os dados retornados da api para a nossa pelo req.headers

            const responseCart = await Cart.findByPk( id_cart );
            const responseBooks = await Books.findByPk( userCart.fk_id_books );
            if(responseBooks.inventory >= responseCart.qtd_items){
                responseBooks.inventory -= responseCart.qtd_items;
            }
           
            const paymentItem ={
                api_payment_id: payment_id,
                api_mechant_order: merchant_order_id,
                api_payment_type: payment_type,
                fk_id_user: responseCart.fk_id_user,
                fk_id_cart: responseCart.id_cart,
                status: status,
                price: responseCart.request_price,
            }
            const paymentCreated = await Payment.create(paymentItem)

            responseCart.status = status
            await responseCart.save()
            await responseBooks.save()
           
            return res.send(paymentCreated)
            
        } catch (error) {
            res.json(error)
        }
    },
    put: async (req, res) => {
        try {
            const { payment_id, payment_type,  status} = req.headers;

            const response = await Payment.findOne({where:{api_payment_id:payment_id}});
            response.api_payment_id = payment_id
            response.api_payment_type = payment_type
            response.status = status

            const paymentUpdated = await response.save()
           
            return res.send(paymentUpdated)

        } catch (error) {
            return res.json(error)
        }
    },
    delete: async (req, res) => {
        try {
            const {id_payment} = req.headers;

            const response = await Payment.destroy({
                where:{id_payment:id_payment, status: 'pending'},
            })

            return res.json(response)
        } catch (error) {
            res.json(error);
        }
    },

    //advanced search user information
    payment_id: async (req, res) => {
        try {
            const {id_payment} = req.headers;

            const response = await Payment.findByPk(id_payment)

            return res.json(response)
        } catch (error) {
            res.json(error);
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
            res.json(error);
        }
    },
}