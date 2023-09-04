require('dotenv').config()

const config = {
  development:{
    'username': 'postgres',
    'password': 'u1bOjhogjpX4qW1g',
    'database': 'postgres',
    'host': 'db.cfsqmfjhyajjjkfnongp.supabase.co',
    'port': '5432',
    'dialect': 'postgres',
  },
  test:{
    'username':process.env.DBUSER,
    'password':process.env.DBPASS,
    'database':process.env.DBNAME,
    'host': process.env.DBHOST,
    'port': process.env.DBPORT,
    'dialect':'postgres',
  },
  production:{
    'username':process.env.DBUSER,
    'password':process.env.DBPASS,
    'database':process.env.DBNAME,
    'host': process.env.DBHOST,
    'port': process.env.DBPORT,
    'dialect':'postgres',
  }
};

module.exports = {
  production:{
    'username':process.env.DBUSER,
    'password':process.env.DBPASS,
    'database':process.env.DBNAME,
    'host': process.env.DBHOST,
    'port': process.env.DBPORT,
    'dialect':'postgres',
  }
}