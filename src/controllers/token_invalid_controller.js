const { Op } = require('sequelize');
const { Token_invalid } = require('../database/models');

module.exports = {
    //crud model user information
    get: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const response = await Token_invalid.findAndCountAll({
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    post: async (req, res) => {
        try {
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors)
            };
            
            const {code} = req.body

            const response = await Token_invalid.create({code: code})
           
            return res.send(response)
            
        } catch (error) {
            const msg = {Error:'Erro ao tentar adicionar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    delete: async (req, res) => {
        try {
            const {data} = req.headers;

            const response = await Token_invalid.destroy({
                where:{
                    createdAt:{ [Op.gt] : data} // Op.gt comparção de datas retorna a data igual ou maior
                },
            })
            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar deletar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
}