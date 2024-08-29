const { Client } = require('pg');
const { Read } = require('./read.js');


const database = new Client({
  user: 'postgres',  // substitua pelo seu usuário do PostgreSQL
  host: '192.168.25.37',    // substitua pelo host do seu PostgreSQL
  database: 'db.pessoaJuridica',// substitua pelo nome do seu banco de dados
  password: 'office',// substitua pela sua senha do PostgreSQL
  port: 5432,           // substitua pela porta do seu PostgreSQL, se diferente
});


