module.exports = {
  DB:'testing_mysql',
  USER:'root',
  PASSWORD:'root',
  HOST:'54.191.253.12',
  dialect:'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
}
