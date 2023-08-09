const {check} = require('express-validator');

const validator_fields_user_information_PUT = [
    check('full_name')
        .optional().notEmpty().withMessage('*o campo nome não pode estar vazio').bail()
        .isLength({min:6}).withMessage('*o campo de nome deve conter ao menos 6 caracteres').bail()
        .trim(),
    check('email')
        .optional().notEmpty().withMessage('*o campo email não pode estar vazio').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('*formato de email inválido, por favor insira um email correto'),
    check('telephone')
        .optional().notEmpty().withMessage('*Informe o seu número de telefone').bail()
        .trim().bail(),
    check('birth_date')
        .optional().notEmpty().withMessage('*Informe sua data de nascimento').bail()
        .trim().bail(),
    check('user_cpf')
        .optional().notEmpty().withMessage('*Informe o CPF').bail()
        .trim().bail(),
    check('user_rg')
        .optional().notEmpty().withMessage('*Informe o RG').bail()
        .trim().bail(),
    check('state')
        .optional().notEmpty().withMessage('*Informe o nome do Estado').bail()
        .trim().bail(), 
    check('city')
        .optional().notEmpty().withMessage('*Informe a nome da Cidade').bail()
        .trim().bail(),
    check('cep')
        .optional().notEmpty().withMessage('*Informe o seu CEP').bail()
        .trim().bail(),
    check('district')
        .optional().notEmpty().withMessage('*informe o nome do bairro').bail()
        .trim().bail(),
    check('road')
        .optional().notEmpty().withMessage('*Informe o nome da rua').bail()
        .trim().bail(),
    check('number')
        .optional().notEmpty().withMessage('*Informe o número da rua').bail()
        .trim().bail(),
    check('complements')
        .optional().notEmpty().withMessage('*Informe um complemento').bail()
        .trim().bail(),
]
module.exports = validator_fields_user_information_PUT;