const {check} = require('express-validator');

const validator_fields_user_information = [
    check('full_name')
        .notEmpty().withMessage('*o campo nome não pode estar vazio').bail()
        .isLength({min:6}).withMessage('*o campo de nome deve conter ao menos 6 caracteres').bail()
        .trim(),
    check('email')
        .notEmpty().withMessage('*o campo email não pode estar vazio').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('*formato de email inválido, por favor insira um email correto'),
    check('telephone')
        .notEmpty().withMessage('*Informe o seu número de telefone').bail()
        .trim().bail(),
    check('birth_date')
        .notEmpty().withMessage('*Informe sua data de nascimento').bail()
        .trim().bail(),
    check('user_cpf')
        .notEmpty().withMessage('*Informe o CPF').bail()
        .trim().bail(),
    check('user_rg')
        .notEmpty().withMessage('*Informe o RG').bail()
        .trim().bail(),
    check('state')
        .notEmpty().withMessage('*Informe o nome do Estado').bail()
        .trim().bail(), 
    check('city')
        .notEmpty().withMessage('*Informe a nome da Cidade').bail()
        .trim().bail(),
    check('cep')
        .notEmpty().withMessage('*Informe o seu CEP').bail()
        .trim().bail(),
    check('district')
        .notEmpty().withMessage('*informe o nome do bairro').bail()
        .trim().bail(),
    check('road')
        .notEmpty().withMessage('*Informe o nome da rua').bail()
        .trim().bail(),
    check('number')
        .notEmpty().withMessage('*Informe o número da rua').bail()
        .trim().bail(),
    check('complements')
        .notEmpty().withMessage('*Informe um complemento').bail()
        .trim().bail(),
]
module.exports = validator_fields_user_information;