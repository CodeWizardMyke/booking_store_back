
//acesso a rotas privadas de primeiro nível
const { Token_invalid, Users } = require('../database/models');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authManager = async (req, res, next) => {
    const {authorization} = req.headers;

    const token = authorization && authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({msg:'Acesso negado!'})
    };
    
    const tokenBlackList =  await Token_invalid.findOne({where:{ code : token}});
    if(tokenBlackList){ return res.status(401).json({msg:'token inválido!'}) };

    try {
        const secret = process.env.JWT_KEY
        jwt.verify(token, secret, async (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Acesso negado!' });
            }
    
            const { id } = decoded;
    
            const userAuthorization = await Users.findOne({ where: { id_user: id, admin: 'true' } });
    
            if (!userAuthorization) {
                return res.status(401).json({ msg: 'Solicitação inválida' });
            }
    
            next(); // Move o next() para dentro do bloco de sucesso da autorização
        
        });
    } catch (error) {
        res.status(400).json({msg:'Token inválido!'})
    }
};

module.exports = authManager;