const {check} =require('express-validator');

const validator_user_login_filds = [
    check('email')
        .notEmpty().withMessage('o campo email não pode estar vazio').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('formato de email inválido, por favor insira um email correto'),
    check('password')
        .notEmpty().withMessage('o campo senha não pode estar vazio').bail()
        .trim().bail()
        .isLength({min:8}).withMessage('senha inválida'),
]

module.exports = validator_user_login_filds