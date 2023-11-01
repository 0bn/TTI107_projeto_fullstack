const protocolo = 'https//';
const host = 'localhost:3000';
const filmesEndPoint = '/filmes';

async function obterFilmes() {
    console.log("Teste 123");
    const URLcompleta = `${protocolo}${host}${filmesEndPoint}`;
    const filmes = (await axios.get(URLcompleta)).data;
    console.log(filmes);
}