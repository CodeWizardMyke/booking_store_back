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
            res.json(error)
        }
    },
    post: async (req, res) => {
        try {
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
            res.json(error)
        }
    },
    put: async (req, res) => {
        try {
            const {id_feedback, subject, msg, fk_id_user} = req.body

            const feedbackSearch = await Feedback.findByPk(id_feedback)

            subject ? feedbackSearch.subject = subject : '';
            msg ? feedbackSearch.msg = msg : '';
            fk_id_user ? feedbackSearch.fk_id_user = fk_id_user: '';
            feedbackSearch.status = 'peding';

            const response = await feedbackSearch.save()
            return res.json(response)

        } catch (error) {
            return res.json(error)
        }
    },
    delete: async (req, res) => {
        try {
            const {id_feedback} = req.headers;

            const response = await Feedback.destroy({where:{id_feedback: id_feedback}})

            return res.json(response)
   
        } catch (error) {
            res.json(error);
        }
    },

    //advanced search user information
    feedback_id: async (req, res) => {
        try {
            const { id_feedback } = req.headers;

            const response = await Feedback.findByPk(id_feedback)

            return res.json(response);
 
        } catch (error) {
            res.json(error);
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
            res.json(error);
        }
    },
}