const {check} = require('express-validator');

const validator_fields_cart = {
    post : [
        check('id_books').notEmpty().withMessage('*Id do livro não foi passado').bail(),
        check('type_selected').notEmpty().withMessage('*type selected inválido').bail(),
        check('qtd_items').notEmpty().withMessage('*qtd items inválida').bail(),
    ],
    put : [
        check('id_books').optional().notEmpty().withMessage('*Id do livro não foi passado').bail(),
        check('type_selected').optional().notEmpty().withMessage('*type selected inválido').bail(),
        check('qtd_items').optional().notEmpty().withMessage('*td items inválida').bail(),
    ]
};

module.exports = validator_fields_cart;