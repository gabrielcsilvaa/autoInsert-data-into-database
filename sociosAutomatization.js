const { Client } = require('pg');
const { Read } = require('./read.js');
const { addSocio } = require('./createBD.js');
const { listarEmpresas } = require('./listarempresas.js');
const { listarSocios } = require('./listarSocios.js');

const client = new Client({
  user: 'postgres',
  host: '192.168.25.83',
  database: 'db.pessoaJuridica',
  password: 'office',
  port: 5432,
});
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.connect();

const socioslistar = async () => {
  const empresas = await listarEmpresas();
  for (let i = 0; i < empresas.length; i++) {
    const api_key_cliente = empresas[i]["api_key_cliente"];
    const nomeEmpresa = empresas[i]["razao_social"];
    const cnpj = empresas[i]["inscricao_federal"];
    const result = await Read(cnpj);
    console.log(nomeEmpresa);
    if(result == false){
    console.log("Empresa não existe");
  }else{
    console.log("Empresa já existe")
    console.log("socio ja adicionado")
  }
    if (api_key_cliente) {   
      const listaSocio = await listarSocios(api_key_cliente);
      if (listaSocio && listaSocio.length > 0 && result ==false) {
        for (let j = 0; j < listaSocio.length; j++) {
          const nomeSocio = listaSocio[j]["nome"];
          const dataNascimento = listaSocio[j]["data_nascimento"];
          
          // Verificar se os dados estão corretos antes de adicionar
          if (nomeSocio && dataNascimento) {
            console.log(`Adicionando sócio: ${nomeSocio}, ${dataNascimento}, ${nomeEmpresa}, ${cnpj}`);
            await addSocio(nomeSocio, dataNascimento, nomeEmpresa, cnpj);
            await delay(3000);
          } else {
            console.warn(`Dados de sócio inválidos: ${JSON.stringify(listaSocio[j])}`);
          }
          
        }
      } if(!listaSocio || listaSocio.length <= 0) {
        console.warn("Dados invalidos")
        await delay(500);
      }
    } else {
      console.warn(`Cliente sem api_key_cliente`);
      await delay(500);
    }
    console.error('/')
  }

  client.end();
};

socioslistar();
