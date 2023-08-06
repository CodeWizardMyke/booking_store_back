module.exports = (sequelize, DataTypes) =>{ 
    const User_information = sequelize.define('User_information',{
        id_user_information:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true
        },
        full_name:DataTypes.STRING,
        email:DataTypes.STRING,
        telephone:DataTypes.STRING,
        birth_date:DataTypes.STRING,
        user_cpf:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        user_rg:DataTypes.STRING,
        city:DataTypes.STRING,
        state:DataTypes.STRING,
        cep:DataTypes.STRING,
        district:DataTypes.STRING,
        road:DataTypes.STRING,
        number:DataTypes.INTEGER,
        complements:DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER,
    },
    {
        timestamps:true,
        tableName:'user_information'
    });

    return User_information;
}