const { Client } = require('pg');

const conectarBanco = new Client({
    user: 'postgres',  
    host: '192.168.25.83',
    database: 'db.pessoaJuridica',
    password: 'office',
    port: 5432,
  });

conectarBanco.connect()
.then(() => console.log('Conectado ao banco de dados'))
.catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = {
conectarBanco: conectarBanco
};