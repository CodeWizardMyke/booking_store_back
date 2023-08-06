

module.exports = (sequelize, DataTypes)=>{
    const Bestsaler = sequelize.define('Bestsaler',{
        id_bestsaler:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        purchasing_score:DataTypes.INTEGER,
        visited_score:DataTypes.INTEGER,
        fk_id_books:DataTypes.INTEGER,
    },{
        timestamps:false,
        tableName:'bestsaler'
    });

    return Bestsaler;
}