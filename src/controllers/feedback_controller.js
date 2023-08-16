const { Feedback } = require('../database/models');
const {validationResult} = require('express-validator')

module.exports = {
    //crud model user information
    get: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const response = await Feedback.findAndCountAll({
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
                return res.json(catchErrors)
            };
            req.body.fk_id_user = req.token_decoded.id ? req.token_decoded.id : null ;
            req.body.status = 'pending';

            const response = await Feedback.create( req.body)

            return res.json(response)
        } catch (error) {
            const msg = {Error:'Erro ao tentar adicionar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    put: async (req, res) => {
        try {
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                return res.json(catchErrors)
            };
            
            const feedbackSearch = await Feedback.findByPk(req.body.id_feedback)

            const response = await feedbackSearch.update(req.body)
            await feedbackSearch.save()
            return res.json(response)

        } catch (error) {
            const msg = {Error:'Erro ao tentar atualizar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    delete: async (req, res) => {
        try {
            const {id_feedback} = req.headers;

            const response = await Feedback.destroy({where:{id_feedback: id_feedback}})

            return res.json(response)
   
        } catch (error) {
            const msg = {Error:'Erro ao tentar deletar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },

    //advanced search user information
    feedback_id: async (req, res) => {
        try {
            const { id_feedback } = req.headers;

            const response = await Feedback.findByPk(id_feedback)

            return res.json(response);
 
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    feedback_user: async (req, res) => {
        try {
            const {page, size, id_user} = req.headers;

            const response = await Feedback.findAndCountAll({
                where:{fk_id_user:id_user},
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
}