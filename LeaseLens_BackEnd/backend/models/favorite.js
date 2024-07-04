const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Favorite extends Model {
  static init(sequelize){
    return super.init({
      user_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      prod_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorites',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db){
    db.Favorite.belongsTo(db.User, { foreignKey: 'user_idx' });
    db.Favorite.belongsTo(db.Product, { foreignKey: 'prod_idx' });
  }
}
