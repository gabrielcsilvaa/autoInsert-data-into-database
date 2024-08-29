

const listarEmpresas = async () => {
    const metodo =  "listar_empresas";
    const url = `https://app.e-kontroll.com.br/api/v1/metodo/${metodo}`;
   
    try {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "p2zazIRGQ9mwizXKkmVRBasVVW234DLdKkIpu53Rw8eh6zFpBOLolUWBCZmz",
          api_key_empresa:
            "yQuZX1A45FYa7gohZvmlHHDsUPvjLnGCTxuXMdae4W8T5x05hgWEvQgtUmxf",
        }),
      })
        .then((response) => response.json())
        .then((data) => data.dados.data);
        
        
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      throw error; // rethrow the error so it can be caught by the caller
    }
  };

  listarEmpresas();

module.exports = {listarEmpresas};