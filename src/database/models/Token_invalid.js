
module.exports = (sequelize, DataTypes) => {
    const Token_invalid = sequelize.define('Token_invalid', {
        id_token_invalid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true
        },
        code:DataTypes.STRING,
    },
    {   
        timestamps:true,
        tableName:'token_invalid'    
    })

    return Token_invalid;
};