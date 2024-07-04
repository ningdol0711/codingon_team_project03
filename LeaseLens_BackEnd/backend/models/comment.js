const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model{
  static init(sequelize){
    return super.init({
      com_idx : {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey: true,
      },
      com_text:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      com_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName:'Comment',
      tableName:'comments',
      charset: 'utf8mb4',
      collate:'utf8mb4_general_ci',
    });
  }
  static associate(db){
    db.Comment.belongsTo(db.User,{foreignKey:'user_idx'});
    db.Comment.belongsTo(db.Review,{foreignKey:'rev_idx'});
  }
}