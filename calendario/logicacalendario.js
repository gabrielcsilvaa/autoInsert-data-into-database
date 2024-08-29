const { conectarBanco } = require("./bandodedados");

const consultarDados = async () => {
    try {
        
        const res = await conectarBanco.query("SELECT * FROM empresas");
        console.log(res.rows)
        
        return res.rows;

    } catch (err) {
        console.error("Erro ao consultar os dados:", err);
        throw err; // Rejeita a promise para tratar o erro no código que chama esta função

    } finally {
        console.log("Conexão encerrada.");
    }
};

consultarDados();

module.exports = {
    consultarDados: consultarDados
};
