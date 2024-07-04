const Sequelize = require('sequelize');
const comment = require('./comment');
const product = require('./product');
const review  = require('./review');
const favorite = require('./favorite');
const user = require('./user');
const dotenv = require('dotenv');

dotenv.config();
const env = process.env.NODE_ENV;
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Comment = comment;
db.User = user;
db.Product = product;
db.Review = review;
db.Favorite = favorite;

Object.keys(db).forEach(modelName =>{
  db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName =>{
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;