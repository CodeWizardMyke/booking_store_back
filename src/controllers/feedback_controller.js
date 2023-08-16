const { Feedback } = require('../database/models');

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
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors)
            };

            const {fk_id_user, subject, msg} = req.body;

            const nData = {
                subject: subject,
                msg: msg,
                status: 'pending',
                fk_id_user: fk_id_user ? fk_id_user : null
            }

            const response = await Feedback.create(nData)
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
                req.file ? deleteBookImage(req.file.filename) : '';
                return res.json(catchErrors)
            };
            
            const {id_feedback, subject, msg, fk_id_user} = req.body

            const feedbackSearch = await Feedback.findByPk(id_feedback)

            subject ? feedbackSearch.subject = subject : '';
            msg ? feedbackSearch.msg = msg : '';
            fk_id_user ? feedbackSearch.fk_id_user = fk_id_user: '';
            feedbackSearch.status = 'peding';

            const response = await feedbackSearch.save()
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