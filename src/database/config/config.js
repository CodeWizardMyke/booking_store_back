require('dotenv').config()

module.exports = {
  'username':process.env.DBUSER,
  'password':process.env.DBPASS,
  'database':process.env.DBNAME,
  'host': process.env.DBHOST,
  'port': process.env.DBPORT,
  'dialect':'postgres',
}