const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Product extends Model{
  static init(sequelize){
    return super.init({
      prod_idx : {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey: true,
      },
      prod_category:{
        type:DataTypes.CHAR(20),
        allowNull:false,
      },
      prod_img:{
        type:DataTypes.STRING(255), // BLOB에서 STRING으로 변경
        allowNull:false,
      },
      prod_name:{
        type:DataTypes.STRING(50),
        allowNull:false,
      },
      prod_text:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      prod_likes:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      prod_price:{
        type:DataTypes.INTEGER,
        allowNull:false,
      }
    },
    {
      sequelize,
      modelName:'Product',
      tableName:'products',
      charset: 'utf8mb4',
      collate:'utf8mb4_general_ci',
    });
  }
  static associate(db){
    db.Product.hasMany(db.Review, { foreignKey : 'prod_idx' });
    db.Product.belongsToMany(db.User, {through:'favorites' , foreignKey : 'prod_idx' });
  }
}