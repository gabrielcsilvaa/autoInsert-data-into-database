const faturamentoEmpresa = async (key) => {
  try {
    const response = await fetch('https://app.e-kontroll.com.br/api/v1/metodo/faturamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: "p2zazIRGQ9mwizXKkmVRBasVVW234DLdKkIpu53Rw8eh6zFpBOLolUWBCZmz",
        api_key_cliente: key,
        comp_inicial: "2024-05-01",
        comp_final: "2024-06-01"
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao tentar obter faturamento: ' + response.statusText);
    }

    const data = await response.json();

    // Verifica se 'dados' existe na resposta antes de acessar 'dados.data'
    if (!data.dados || !data.dados.data) {
      throw new Error('Formato de resposta inválido: dados não encontrados');
    }

    return data.dados.data;
  } catch (error) {
    console.error('Erro na requisição de faturamento:', error.message);
    throw error; // Lança o erro para ser tratado no código que chama faturamentoEmpresa
  }
};

module.exports = {faturamentoEmpresa};