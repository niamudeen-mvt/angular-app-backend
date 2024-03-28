module.exports = {
  DB:'testing_mysql',
  USER:'root',
  PASSWORD:'root',
  HOST:'localhost',
  dialect:'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
}
