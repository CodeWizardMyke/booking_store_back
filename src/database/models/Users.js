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

    Users.associate = (models) =>{
        Users.hasOne( models.User_information, {foreignKey:'fk_id_user', as:'information'})
        Users.hasMany(models.Payment, {foreignKey:'fk_id_user', as :'payment'})
        Users.hasMany(models.Feedback, {foreignKey:'fk_id_user', as:'feedback'})
        Users.belongsToMany(models.Books,{
            through:'Cart',
            as:'cart_item',
            foreignKey:'fk_id_user',
            otherKey:'fk_id_books',
            timestamps:false
        })
    }

    return Users;
}