const listarSocios = async (api_key_cliente) => {
  const metodo = "socios_aniversariantes";
  const url = `https://app.e-kontroll.com.br/api/v1/metodo/${metodo}`;

  try {
      const socioApi = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              api_key: "p2zazIRGQ9mwizXKkmVRBasVVW234DLdKkIpu53Rw8eh6zFpBOLolUWBCZmz",
              api_key_cliente: api_key_cliente,
          }),
      });

      const data = await socioApi.json();

      if (data && data.dados && data.dados.data) {
          return data.dados.data;
      } else {
          console.error("Estrutura de resposta inesperada", data);
          return [];
      }
  } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      throw error; // rethrow the error so it can be caught by the caller
  }
};

module.exports = { listarSocios };
