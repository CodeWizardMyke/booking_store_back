require('dotenv').config();

module.exports = {
  use_env_variable: process.env.DATABASE_URL ? 'DATABASE_URL' : null,
  username: process.env.DBUSER || null,
  password: process.env.DBPASS || null,
  port: process.env.DBPORT || 5432, // Porta padrão para PostgreSQL
  host: process.env.DBHOST || null,
  dialect: process.env.DBDIALECT || 'postgres',
  database: process.env.DBNAME || null,
};