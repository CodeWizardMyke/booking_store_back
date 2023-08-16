require('dotenv').config()
const { Users } = require('../database/models');

const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login_user: async (req, res) => {
        const catchErrors = validationResult(req);
        if(catchErrors.errors.length){
            return res.status(401).json(catchErrors);
        }

        const {email, password} = req.body;
        let user = await Users.findOne({where:{email:email}});
        if(!user){
            return res.status(404).json({msg:'Email não cadastrado no sistema'});
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(422).json({msg:'Senha inválida! '});
        }

        try {
            const secret = process.env.JWT_KEY;

            const token = jwt.sign(
                { id: user.id_user },
                secret,
                //{expiresIn:'4h'}
            );
            user.password = undefined;
            user.email = undefined;
            
            return res.json({token, user})
        } catch (error) {
            const msg = {Error:'Erro ao tentar obter dados do servidor!'};
            console.log(error);
            res.status(401).json(msg);
        }
    }
}