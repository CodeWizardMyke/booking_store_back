const {check} = require('express-validator');

const validator_fields_payment = {
    post : [
        check('id_cart').notEmpty().withMessage('*Id do carrinho inválido').bail(),
        check('payment_id').notEmpty().withMessage('*payment id inválido').bail(),
        check('merchant_order_id').notEmpty().withMessage('*merchant order inválida').bail(),
        check('payment_type').notEmpty().withMessage('*payment type inválido').bail(),
        check('status').notEmpty().withMessage('*status inválido').bail(),
    ],
    put : [
        check('payment_type').optional().notEmpty().withMessage('*payment type inválido').bail(),
        check('status').optional().notEmpty().withMessage('*status inválido').bail(),
    ]
};

module.exports = validator_fields_payment;