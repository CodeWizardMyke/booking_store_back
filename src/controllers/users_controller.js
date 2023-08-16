const { Users } = require('../database/models');

//import bibliotecas js
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

//import functions
const deleteUsersImage = require('../functions/deleteUsersImage');
const { Op } = require('sequelize');

module.exports = {

    //crud model users
    get_users: async (req, res) => {
        try {
            const {page, size} = req.headers;

            const data = await Users.findAndCountAll({
                where:{status:'active'},
                limit: Number(size),
                offset: Math.ceil( Number(size) * ( Number(page) -1 ) )
            })

            return res.json(data)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    post_user: async (req, res) => {
        try {
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                req.file ? deleteUsersImage(req.file.filename) : '';
                return res.json(catchErrors)
            }

            req.file ?  req.body.user_avatar = req.file.filename : req.body.user_avatar = 'default.jpg';
            req.body.status = 'active';
            req.body.admin = 'false';
            req.body.password = bcrypt.hashSync(req.body.password, 10)

            const insertUser = await Users.create(req.body);
            return res.json(insertUser)
        } catch (error) {
            const msg = {Error:'Erro ao tentar adicionar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    put_user: async (req, res) => {
        try {
            const catchErrors = validationResult(req);
            if(catchErrors.errors.length){
                req.file ? deleteUsersImage(req.file.filename) : '';
                return res.json(catchErrors)
            }
            
            const emailExists = await Users.findAll({where:{email:req.body.email}})
            if(emailExists.length){
                req.file ? deleteUsersImage(req.file.filename) : '';
                return res.json({error:{email:'email já cadastrado no sistema'}});
            }
            
            delete req.body.re_email;
            delete req.body.re_password;
            if(req.body.password){
                req.body.password = bcrypt.hashSync(req.body.password, 10)
            }
            
            const {id_user} = req.headers;
            const userSearch = await Users.findByPk(id_user);
            await userSearch.update(req.body)

            return res.json(req.body)
        } catch (error) {
            const msg = {Error:'Erro ao tentar atualizar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    delete_user: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const userSearch = await Users.findByPk(id_user);
            userSearch.status = 'disabled';

            await userSearch.update()
            return res.json(userSearch)
        } catch (error) {
            const msg = {Error:'Erro ao tentar deletar dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },

    //advanced search users
    get_user_id: async (req, res) => {
        try {
            const {id_user} = req.headers;

            const userSearch = await Users.findByPk(id_user);

            return res.json(userSearch)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
    get_user_email: async (req, res) => {
        try {
            const {email} = req.headers;

            const userSearch = await Users.findAndCountAll({
                where:{ email: {[Op.like]:`%${email}%`} }
            });

            return res.json(userSearch)
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(500).json(msg);
        }
    },
}