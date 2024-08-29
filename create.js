const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '192.168.25.83',
  database: 'db.pessoaJuridica',
  password: 'office',
  port: 5432,
});

client.connect();

const add = async (nome, dataabertura, cnpj, cadastroonvio) => {
  try {
    console.log("Conectado!");

    const addSQL = {
      text: 'INSERT INTO empresas(nome, dataabertura, cnpj, cadastroonvio) VALUES($1, $2, $3, $4) RETURNING *',
      values: [nome, dataabertura, cnpj, cadastroonvio],
    };

    const res = await client.query(addSQL);
    console.log("Empresa adicionada:", res.rows[0]);

  } catch (err) {
    console.error("Erro ao adicionar empresa", err);
  }
};

const addSocio = async (nomeSocio, dataNascimento, nomeEmpresa, cnpj) => {
  try {

    const addSocioSQL = {
      text: 'INSERT INTO socios(nome_socio, data_nascimento, empresa, cnpj) VALUES($1, $2, $3, $4) RETURNING *',
      values: [nomeSocio, dataNascimento, nomeEmpresa, cnpj],
    };

    const res = await client.query(addSocioSQL);
    console.log("Sócio adicionado:", res.rows[0]);

  } catch (err) {
    console.error("Erro ao adicionar sócio", err);
  }
};

module.exports = { add, addSocio };
