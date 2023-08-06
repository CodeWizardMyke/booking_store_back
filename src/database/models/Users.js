module.exports = (sequelize, DataTypes) =>{ 
    const Users = sequelize.define('Users',{
        id_user:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true
        },
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        username:DataTypes.STRING,
        user_avatar:DataTypes.STRING,
        status:DataTypes.STRING,
        admin:DataTypes.STRING,
    },
    {
        timestamps:true,
        tableName:'users'
    });

    return Users;
}