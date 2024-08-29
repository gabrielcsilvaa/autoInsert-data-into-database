const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '192.168.25.83',
  database: 'db.pessoaJuridica',
  password: 'office',
  port: 5432,
});

client.connect();

const Read = async (cnpj) => {
  try {
    const query = {
      text: 'SELECT EXISTS (SELECT 1 FROM socios WHERE cnpj = $1)',
      values: [cnpj],
    };
    const res = await client.query(query);
    return res.rows[0].exists;
  } catch (err) {
    console.error("Erro", err);
  }
};

module.exports = { Read };