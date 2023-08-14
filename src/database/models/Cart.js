
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define( 'Cart' , 
    {
        id_cart:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false,
            unique:true
        },
        item_price:DataTypes.DECIMAL,
        request_price:DataTypes.INTEGER,
        status:DataTypes.STRING,
        status_delivery:DataTypes.STRING,
        qtd_items:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        type_selected:{
            type:DataTypes.STRING,
            allowNull:false
        },
        user_cpf:DataTypes.STRING,
        fk_id_books:DataTypes.INTEGER,
        fk_id_user:DataTypes.INTEGER,
    },
    {
        timestamps:false,
        tableName:'cart'
    })

    Cart.associate = (model) => {
        Cart.hasMany(model.Payment, {foreignKey:'fk_id_cart', as :'payment'})
        Cart.belongsTo(model.Books, { foreignKey: 'fk_id_books', as: 'book' });
    }

    return Cart;
}