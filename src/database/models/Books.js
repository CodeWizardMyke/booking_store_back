
module.exports = (sequelize, DataTypes)=>{
    const Books = sequelize.define('Books',{
        id_books:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        title:DataTypes.STRING,
        author:DataTypes.STRING,
        publishing_company:DataTypes.STRING,
        edition:DataTypes.STRING,
        status:DataTypes.STRING,
        synopsis:DataTypes.STRING,
        front_cover:DataTypes.STRING,
        genre:DataTypes.STRING,
        kindle_price:DataTypes.DECIMAL,
        common_price:DataTypes.DECIMAL,
        special_price:{
            type:DataTypes.DECIMAL,
            allowNull:true
        },
        publication_date:DataTypes.STRING,
        dimensions:DataTypes.STRING,
        number_pages:DataTypes.STRING,
        inventory:DataTypes.STRING,
        language:DataTypes.STRING,
    },
    {
        tableName:'books',
        timestamps:true
    });

    Books.associate = (models) =>{
        Books.hasMany(models.Bestsaler, {foreignKey:'fk_id_books', as:'bestsaler'})
        Books.belongsToMany(models.Users, {
            through:'Cart',
            as:'cart_user',
            foreignKey:'fk_id_books',
            otherKey:'fk_id_user',
            timestamps:false
        })
    }

    return Books;
}
