module.exports = {
  host : process.env.DB_HOST,
  database : process.env.DB_NAME,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  dialect:'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
}
