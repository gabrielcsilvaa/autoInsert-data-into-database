const impostosEmpresa = async (key) => {
  try {
      const response = await fetch('https://app.e-kontroll.com.br/api/v1/metodo/impostos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              api_key: "p2zazIRGQ9mwizXKkmVRBasVVW234DLdKkIpu53Rw8eh6zFpBOLolUWBCZmz",
              api_key_cliente: key,
              comp_inicial: "2024-05-01",
              comp_final: "2024-07-01"
          })
      });

      if (!response.ok) {
          throw new Error('Erro ao buscar os dados: ' + response.status);
      }

      const data = await response.json();
      
      return data.dados.data;
  } catch (error) {
      console.error('Erro na função impostosEmpresa:', error);
      throw error; // Lança o erro novamente para quem chamou a função lidar com ele
  }
};

module.exports = { impostosEmpresa };
