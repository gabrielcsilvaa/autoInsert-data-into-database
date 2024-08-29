
  const consultaCnpj = async (cnpj) => {
    const url = `https://api.cnpja.com/office/${cnpj}?simples=true`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ece5e0ba-a0c9-4396-988d-190e2c64af11-5fe1699e-4777-4fc2-ba23-31a8a3ebcfae"
        },
      });
      const data = await response.json();
      return data.founded;

    } catch (error) {
      console.error('Erro ao consultar o CNPJ:', error);
      return null;
    }
  };
  async function resultadosss() {

  const resultado = await consultaCnpj('31261468000163');
  console.log(resultado);
  
}

resultadosss();

module.exports = {consultaCnpj};
