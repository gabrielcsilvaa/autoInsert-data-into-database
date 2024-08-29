const { Client } = require('pg');

const client = new Client({
  user: 'postgres',  // substitua pelo seu usuário do PostgreSQL
  host: '192.168.25.83',    // substitua pelo host do seu PostgreSQL
  database: 'db.pessoaJuridica',// substitua pelo nome do seu banco de dados
  password: 'office',// substitua pela sua senha do PostgreSQL
  port: 5432,           // substitua pela porta do seu PostgreSQL, se diferente
});

const criarTabela = async () => {
try{
  
await client.connect();
  console.log("Conectado!");

  const criarTabelaSQL =`
    CREATE TABLE IF NOT EXISTS empresas (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) UNIQUE,
      dataabertura VARCHAR(255),
      cnpj VARCHAR(14) UNIQUE,
      cadastroOnvio VARCHAR(255)
    )
  `;

  await client.query(criarTabelaSQL);
  console.log("Processo bem sucedido");
} catch (err) {
  console.error("Erro", err);

}finally {
  // Fechando a conexão
  await client.end();
  console.log("Conexão encerrada.");
  }
}

criarTabela();

module.exports = { criarTabela };