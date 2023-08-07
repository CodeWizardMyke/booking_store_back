const {check} = require('express-validator');
const path = require('path');

const validator_fields_book_put = [
    check('title').notEmpty().withMessage('*O campo titulo não pode estar vazio').bail(),

    check('author').notEmpty().withMessage('*O campo autor não pode estar vazio').bail()
    .isLength({max:80}).withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
        .trim().bail(),

    check('publishing_company').notEmpty().withMessage('*O campo editora não pode estar vazio').bail()
        .isLength({max:80}).withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
        .trim().bail(),

    check('edition').notEmpty().withMessage('*O campo da edição do produto não pode estar vazio').bail()
        .trim().bail(),

    check('synopsis').notEmpty().withMessage('*O campo sinopse do produto não pode estar vazio').bail()
        .trim().bail(),

    check('genre').notEmpty().withMessage('*O campo genero do produto não pode estar vazio').bail()
        .isLength({max:120}).withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
        .trim().bail(), 

    check('kindle_price').notEmpty().withMessage('*O campo do preço padrão do produto não pode estar vazio').bail()
        .trim().bail(),  

    check('publication_date').notEmpty().withMessage('*O campo da data de publicação do produto não pode estar vazio').bail()
        .trim().bail(), 

    check('language').notEmpty().withMessage('*O campo de idioma do produto não pode estar vazio').bail()
        .trim().bail(),  

    check('inventory').notEmpty().withMessage('*O campo da quantidade de produtos em estoque não pode estar vazio').bail()
        .isLength({min:1}).withMessage('O valor mínimo requerido é de uma unidade em estoque').bail()
        .trim().bail(), 

    check('number_pages').notEmpty().withMessage('O campo quantidade de páginas do produto não pode estar vazio').bail()
        .trim().bail(),

    check('front_cover').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.gif'];
    
        if(!file){
            throw new Error(`precisa de selecionar um arquivo`)
        }else{
            let fileExtensions = path.extname(file.originalname);
    
            if(!acceptedExtensions.includes(fileExtensions)){
                throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
            }
        return true;
        }
    })
]

module.exports = validator_fields_book_put