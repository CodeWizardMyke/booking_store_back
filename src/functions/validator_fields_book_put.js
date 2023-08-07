const {check} = require('express-validator');
const path = require('path');

const cheking_fields_book_put = [
    check('title').optional().notEmpty().withMessage('*O campo titulo não pode estar vazio').bail(),

    check('author').optional().notEmpty().withMessage('*O campo autor não pode estar vazio').bail()
    .isLength({max:80}).optional().withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
        .trim().bail(),

    check('publishing_company').optional().notEmpty().withMessage('*O campo editora não pode estar vazio').bail()
        .isLength({max:80}).withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
        .trim().bail(),

    check('edition').optional().notEmpty().withMessage('*O campo da edição do produto não pode estar vazio').bail()
        .trim().bail(),

    check('synopsis').optional().notEmpty().withMessage('*O campo sinopse do produto não pode estar vazio').bail()
        .trim().bail(),

    check('genre').optional().notEmpty().withMessage('*O campo genero do produto não pode estar vazio').bail()
        .isLength({max:120}).withMessage('*Este campo execeu o limite máximo de caracteres permitidos').bail()
        .trim().bail(), 

    check('kindle_price').optional().notEmpty().withMessage('*O campo do preço padrão do produto não pode estar vazio').bail()
        .trim().bail(),  

    check('publication_date').optional().notEmpty().withMessage('*O campo da data de publicação do produto não pode estar vazio').bail()
        .trim().bail(), 

    check('language').optional().notEmpty().withMessage('*O campo de idioma do produto não pode estar vazio').bail()
        .trim().bail(),  

    check('inventory').optional().notEmpty().withMessage('*O campo da quantidade de produtos em estoque não pode estar vazio').bail()
        .isLength({min:1}).withMessage('O valor mínimo requerido é de uma unidade em estoque').bail()
        .trim().bail(), 

    check('number_pages').optional().notEmpty().withMessage('O campo quantidade de páginas do produto não pode estar vazio').bail()
        .trim().bail(),

    check('front_cover').optional().custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.gif'];
    
        if(file){
            let fileExtensions = path.extname(file.originalname);
    
            if(!acceptedExtensions.includes(fileExtensions)){
                throw new Error(`As extensões de arquivo permitidos são ${acceptedExtensions.join(', ')}`)
            }
            return true;
        }
    })
]

module.exports = cheking_fields_book_put;