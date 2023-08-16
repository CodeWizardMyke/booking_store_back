const { Cart, Books } = require('../database/models');

const PaymentNewItem = async ( req ) => {
    const {id_cart, payment_id, payment_type, merchant_order_id, status} = req.body;

    // os dados req.headers payment_id entre outros serão obtidos apartir do consumo da api do "mercado pago api" 
    // no seu app front end repase os dados retornados da api para a nossa pelo req.headers

    const responseCart = await Cart.findByPk( id_cart );
    const responseBook = await Books.findByPk( responseCart.fk_id_books );
    if(responseBook.inventory >= responseCart.qtd_items){
        responseBook.inventory -= responseCart.qtd_items;
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

    responseCart.status = status
    await responseCart.save()
    await responseBook.save()

    return paymentItem ;
};

module.exports =PaymentNewItem;