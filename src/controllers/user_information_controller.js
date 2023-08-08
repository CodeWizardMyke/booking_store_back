const { User_information } = require('../database/models');

//import bibliotecas js
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

//import functions
const deleteUsersImage = require('../functions/deleteUsersImage');
const { Op } = require('sequelize');

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
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                return res.json(catchErrors)
            }
            
            const emailExists = await Users.findAll({where:{email:req.body.email}})
            if(emailExists.length){
                return res.json({error:{email:'email já cadastrado no sistema'}});
            }
            
            const {id_user_information} = req.headers;
            const userSearch = await User_information.findByPk(id_user_information);
            await userSearch.update(req.body)

            return res.json(req.body)
        } catch (error) {
            return res.json(error)
        }
    },
    delete_user_information: async (req, res) => {
        try {
            const {id_user_information} = req.headers;

            const userSearch = await User_information.findByPk(id_user);
            await User_information.destroy({where:{id_user_information:id_user_information}})

            return res.json(userSearch)
        } catch (error) {
            res.json(error);
        }
    },

    //advanced search user information
    get_user_information_id: async (req, res) => {
        try {
            const {id_user_information} = req.headers;

            const userSearch = await Users.findByPk(id_user_information);

            return res.json(userSearch)
        } catch (error) {
            res.json(error);
        }
    },
}