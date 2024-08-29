const { listarEmpresas } = require("./apiListarEmpresas");
const { faturamentoEmpresa } = require("./apiFaturamento");
const {impostosEmpresa} = require("./apiImpostos")
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const listar = async () => {
    try {
        const listaDasEmpresas = await listarEmpresas();
        let cont = 0
        const separacaoEmpresas = [];
        for (const empresa of listaDasEmpresas) {
            const nome = empresa.razao_social;
            const cnpj = empresa.inscricao_federal;
            const key = empresa.api_key_cliente;
            
            let faturar, comprar, despesas, impostos, somaImpostos = 0 ;


            if(key != null){
             let modificarImposto = await impostosEmpresa(key);
                if(modificarImposto.length == 0){
                    impostos = "Sem informações"
                }else{
                    for (let i = 0; i < modificarImposto.length; i++) {
                        impostos = parseFloat(modificarImposto[i].arecolher);
                        if (!isNaN(impostos)) { // Verifica se a conversão foi bem-sucedida
                            somaImpostos += impostos; 
                            somaImpostos = Math.round(somaImpostos * 100) / 100; // Arredonda para 2 casas decimais

                    }
                }
            }
             let modificar = await faturamentoEmpresa(key);
                if(modificar.length == 0){
                    faturar = "Sem informações"
                    comprar = "Sem informações"
                    despesas = "Sem informações"
                 }else{
                    faturar = modificar[0].faturamento
                    comprar = modificar[0].compras
                    despesas = modificar[0].compras_uso
                    
                 }
             
            }else{
             faturar = "API Key desativada"
             comprar = "API Key desativada"
             despesas = "API Key desativada"
             impostos = "API key desativada"
            }
                
                cont = cont + 1
            console.log(faturar);
            console.log(comprar);
            console.log(despesas);
            console.log(somaImpostos);
            console.log(cont);
            
            separacaoEmpresas.push({
                nome: nome,
                cnpj: cnpj,
                key: key,
                faturamento: faturar,
                compras: comprar,
                despesas: despesas,

                impostos:somaImpostos
            });
            
            // Adiciona um intervalo de 1 segundo (1000 ms) entre as requisições
            await delay(1600);
        }

        console.log(separacaoEmpresas);
    } catch (error) {
        console.error('Erro ao listar empresas:', error.message);
    }
};

listar();
