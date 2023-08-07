const {check} = require('express-validator');
const path = require('path')

const validator_image_format = [
    check('front_cover').custom((value, {req}) =>{
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

module.exports = validator_image_format;