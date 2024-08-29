const { Client } = require('pg');

const conectarBanco = new Client({
    user: 'postgres',  // substitua pelo seu usuário do PostgreSQL
    host: '192.168.25.83',    // substitua pelo host do seu PostgreSQL
    database: 'db.pessoaJuridica',// substitua pelo nome do seu banco de dados
    password: 'office',// substitua pela sua senha do PostgreSQL
    port: 5432,           // substitua pela porta do seu PostgreSQL, se diferente
  });

  // Conectar ao banco de dados apenas uma vez no início do aplicativo
conectarBanco.connect()
.then(() => console.log('Conectado ao banco de dados'))
.catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = {
conectarBanco: conectarBanco
};