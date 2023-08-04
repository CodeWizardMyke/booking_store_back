require('dotenv').config()

module.exports = {
  'username': process.env.DBUSERNAME,
  'password':process.env.DBPASSWORD,
  'dialect':process.env.DBDIALECT,
  'database':process.env.DBDATABASE,
  'host':process.env.DBHOST,
  'port':process.env.DBPORT,
}