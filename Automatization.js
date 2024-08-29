const { Client } = require('pg');
const { Read } = require('./read.js');
const { add } = require('./createBD.js');
const {consultaCnpj} = require('./apiCnpj.js')
const {listarEmpresas} = require('./listarempresas.js')
const client = new Client({
  user: 'postgres',  // substitua pelo seu usuário do PostgreSQL
  host: '192.168.25.83',    // substitua pelo host do seu PostgreSQL
  database: 'db.pessoaJuridica',// substitua pelo nome do seu banco de dados
  password: 'office',// substitua pela sua senha do PostgreSQL
  port: 5432,           // substitua pela porta do seu PostgreSQL, se diferente
});

const contarDigitos = (str) => {
  // Usa expressão regular para corresponder a todos os dígitos na string
  const digitos = str.match(/\d/g);
  // Retorna o comprimento do array de dígitos ou 0 se não houver dígitos
  return digitos ? digitos.length : 0;
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Conecta ao banco de dados apenas uma vez
client.connect();

const testando = async () => {
  const empresas = await listarEmpresas()
  for (let i = 0; i < empresas.length; i++) {
    const cnpj = empresas[i]["inscricao_federal"];
    
    
    const result = await Read(cnpj);
    
  
    if(result == false && empresas[i]["status_empresa"] == 'A' && empresas[i]["inscricao_federal"] != null  && contarDigitos(empresas[i]["inscricao_federal"]) >= 14) {
      const dataabertura = await consultaCnpj(cnpj);
      console.log(empresas[i]["razao_social"],dataabertura,empresas[i]["inscricao_federal"], empresas[i]["data_cadastro"])
      
      await delay(10000);
    }else{

    }
  }

  // Fecha a conexão após processar todos os objetos
  client.end();
};

testando();
