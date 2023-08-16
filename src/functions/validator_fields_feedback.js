const {check} = require('express-validator');

const validator_fields_feedback = {
    post : [
        check('subject').notEmpty().withMessage('*Ititulo inválido').bail(),
        check('msg').notEmpty().withMessage('*Mensagem inválida').bail(),
        check('fk_id_user').optional.notEmpty().withMessage('*Id inválido').bail(),
    ],
    put : [
        check('subject').optional().notEmpty().withMessage('*titulo inválido').bail(),
        check('msg').optional().notEmpty().withMessage('*Mensagem inválida').bail(),
        check('id_feedback').notEmpty().withMessage('*Informe o id do seu ticket').bail(),
    ]
};

module.exports = validator_fields_feedback;