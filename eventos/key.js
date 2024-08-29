const { listarEmpresas } = require("./apiListarEmpresas");
const { faturamentoEmpresa } = require("./apiFaturamento");

const key = "&inV@ekS2(o%9k*SeXY2yM9w4$H@AhT)AJv7HHNskx9Ndf)o!qX%oBgKdr3";

testando = async () => {
    teste = await faturamentoEmpresa(key)
    console.log(teste[0].faturamento)
}
testando();