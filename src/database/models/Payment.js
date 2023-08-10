

module.exports = (sequelize, DataTypes) =>{ 
    const Payment = sequelize.define('Payment',{
        id_payment:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true
        },
        api_payment_id:DataTypes.INTEGER,
        api_mechant_order:DataTypes.STRING,
        api_payment_type:DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER,
        fk_id_cart:DataTypes.INTEGER,
        status:DataTypes.STRING,
        price:DataTypes.DECIMAL,
    },
    {
        timestamps:true,
        tableName:'payment'
    });

    Payment.associate = (models) =>{
        Payment.belongsTo(models.Users, {foreignKey:'fk_id_user', as: 'user'})
        Payment.belongsTo(models.Cart, {foreignKey:'fk_id_cart', as: 'cart'})
    }

    return Payment;
}