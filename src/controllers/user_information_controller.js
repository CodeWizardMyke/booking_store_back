const { User_information } = require('../database/models');

//import bibliotecas js
const { validationResult } = require('express-validator')

module.exports = {

    //crud model user information
    get_user_information: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const data = await User_information.findAndCountAll({
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(data)
        } catch (error) {
            res.json(error)
        }
    },
    post_user_information: async (req, res) => {
        try {
            const {id_user} = req.headers

            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                return res.json(catchErrors)
            }
            req.body.fk_id_user = id_user

            const insertUser = await User_information.create(req.body);

            return res.json(insertUser)
        } catch (error) {
            res.json(error)
        }
    },
    put_user_information: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                return res.json(catchErrors)
            }
            
            const userSearch = await User_information.findOne({where:{fk_id_user:id_user}});
            await userSearch.update(req.body)

            return res.json(req.body)
        } catch (error) {
            return res.json(error)
        }
    },
    delete_user_information: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const dataDeleted = await User_information.destroy({where:{fk_id_user:id_user}})

            return res.json(dataDeleted)
        } catch (error) {
            res.json(error);
        }
    },

    //advanced search user information
    get_user_information_id: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const userSearch = await Users.findOne({where:{fk_id_user:id_user}});

            return res.json(userSearch)
        } catch (error) {
            res.json(error);
        }
    },
}