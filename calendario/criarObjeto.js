const { consultarDados } = require("./logicacalendario.js");
const { conectarBanco } = require("./bancodedados.js");
const { getYear, differenceInCalendarDays, parseISO, format } = require('date-fns');
// obter data atual usando o date-fns
const dataAtual = new Date();

async function testando() {
    try {
        const resultados = await consultarDados();
        
        const listaEventos = resultados.map(item => {
            const data = item.dataabertura;
            const dataMD = data ? data.slice(-5) : 'Data não disponível';
            const anoAtual = getYear(dataAtual);
            const dataCompleta = anoAtual + '-' + dataMD 
            return {
                title: item.nome,
                date: dataCompleta,
                color: 'orange'
            };          
        });
          
        const listaEventosOrganizada = listaEventos.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          });        
        
        // console.log(listaEventosOrganizada);

        
        // FUNÇÃO PARA O CARD QUE FICA EM CIMA DO DASHBOARD
        
        const getProximoAniversario = () => {
            const proximosAniversarios = listaEventosOrganizada.map(evento => {
                const aniversarioEsteAno = parseISO(evento.date);
                
                
                if (aniversarioEsteAno < dataAtual) {
                    aniversarioEsteAno.setFullYear(aniversarioEsteAno.getFullYear() + 1);
                }
            
                const diasParaAniversario = differenceInCalendarDays(aniversarioEsteAno, dataAtual);
                
                return {
                    ...evento,
                    diasParaAniversario,
                };
            });
          
            proximosAniversarios.sort((a, b) => a.diasParaAniversario - b.diasParaAniversario);
          
            return proximosAniversarios[0];
        };
          
        const proximoAniversario = getProximoAniversario();
        console.log(proximoAniversario);

    } catch (error) {
        console.error('Erro ao executar teste:', error);
    } finally {
       
        await conectarBanco.end();
    }
}

testando();
