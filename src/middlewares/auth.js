
//acesso a rotas privadas de primeiro nível
const { Token_invalid } = require('../database/models');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const {authorization} = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if(!token) {
        return res.status(401).json({msg:'Acesso negado!'})
    }
    
    const tokenBlackList = await Token_invalid.findOne({where: { code: token } })
    if(tokenBlackList){
        return res.status(401).json({msg:'token inválido!'})
    }
    
    try {
        const secret = process.env.JWT_KEY
        jwt.verify(token, secret, (error, decoded) => {
            if(error){
                return res.status(401).json({msg:'Acesso negado!'})
            };
            req.token_decoded = decoded 
        })

        next();
    } catch (error) {
        res.status(400).json({msg:'Token inválido!'})
    }
};

module.exports = auth;