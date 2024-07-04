const DataTypes  = require('sequelize');
const {Model} =DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            user_idx: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_ID: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true,
            },
            user_name: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            user_pw: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            user_points: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            // -----------------
            role: {
                type: DataTypes.STRING,
                defaultValue: 'user' 
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Review, { foreignKey: 'user_idx' });
        db.User.hasMany(db.Comment, { foreignKey: 'user_idx' });
        db.User.belongsToMany(db.Product, { through: 'favorites', foreignKey: 'user_idx' });
    }
};
