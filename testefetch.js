const listarSocios = async () => {
    const metodo =  "socios_aniversariantes";
    const url = `https://app.e-kontroll.com.br/api/v1/metodo/${metodo}`;
   
    try {
      const teste = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "p2zazIRGQ9mwizXKkmVRBasVVW234DLdKkIpu53Rw8eh6zFpBOLolUWBCZmz",
          api_key_cliente:"&inV@ekS2(o%9k*SeXY2yM9w4$H@AhT)AJv7HHNskx9Ndf)o!qX%oBgKdr3",
        }),
      })
        .then((response) => response.json())
        .then((data) => data.dados.data);
        console.log(teste)
        return teste
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      throw error; // rethrow the error so it can be caught by the caller
    }
  };

  listarSocios();
module.exports = {listarSocios};