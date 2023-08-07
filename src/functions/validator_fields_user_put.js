const {check} = require('express-validator');
const path = require('path');

const validator_fields_users_put = [
        
    check('username')
        .optional().trim()
        .notEmpty().withMessage('o campo nome não pode estar vazio').bail()
        .isLength({min:6}).withMessage('o campo de nome deve conter ao menos 6 caracteres').bail()
        .trim(),

    check('email')
        .optional().trim()
        .notEmpty().withMessage('o campo email não pode estar vazio').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('formato de email inválido, por favor insira um email correto'),
    
    check('re_email')
        .optional().trim()
        .notEmpty().withMessage('confirmação de email não pode estar vazio').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('formato de email inválido, por favor insira um email correto').bail()
        .custom((value, {req} ) => {
            let {email,re_email} = req.body
                if(email !== re_email){
                    throw new Error(`os emails informados são diferentes`)
                }
                return true
        }),

    check('password')
        .optional().trim()
        .notEmpty().withMessage('o campo senha não pode estar vazio').bail()
        .trim().bail()
        .isLength({min:8}).withMessage('o numero mínimo de cumprimento da senha são de 8 caracteres'),

    check('re_password')
        .optional().trim()
        .notEmpty().withMessage('confirmação de senha não pode estar vazio').bail()
        .isLength({min:8}).withMessage('o numero mínimo de cumprimento da senha são de 8 caracteres').bail()
        .custom((value, {req} ) => {
            let {password,re_password} = req.body
                if(password !== re_password){
                    throw new Error(`as senhas informados são diferentes`)
                }
                return true
        }),

    check('user_avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.gif'];

        if(file){
            let fileExtensions = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtensions)){
                throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
            }
            return true;
        }
        return true;
    })
]

module.exports = validator_fields_users_put;