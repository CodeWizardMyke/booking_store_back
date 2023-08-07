
let CountPages = (req, res, next) => {

    // validação do number_page e conversao para um valor numerico
    if(!Number(req.headers.page)){
        req.headers.page = 1;
    }else{
        req.headers.page = Number(req.headers.page)
    }

    // validação da qtq_items_page e conversao para um valor numerico
    if(!Number(req.headers.size)){
        req.headers.size = 40;
    }else{
        req.headers.size = Number(req.headers.size);
    }

    return next();
}

module.exports = CountPages;