const dbConfig = require("./config/config");
var fs = require('fs');
var path = require('path');
const Sequelize = require('sequelize')
var basename = path.basename(__filename);

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
});



const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


fs
  .readdirSync(__dirname + '/models')
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file !== 'index.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, '/models/', file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });




module.exports = db;

