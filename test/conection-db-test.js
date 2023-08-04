const Sequelize = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize( 
    'databasename',
    'databaseuser',
    'databasepass@', 
    {
        host: 'databasehost',
        dialect:'databasedialect'
    }
);

// Teste da conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });