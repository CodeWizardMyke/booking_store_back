require('dotenv').config()

const config = 
{
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: 'bookstoreDb',
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: 'bookstoreDb',
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: 'bookstoreDb',
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
}

module.exports = config