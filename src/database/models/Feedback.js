module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        id_feedback:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true
        },
        subject:DataTypes.STRING,
        msg:DataTypes.STRING,
        status:DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER,
    },
    {
        timestamps:false,
        tableName:'feedback'
    });

    return Feedback;
}