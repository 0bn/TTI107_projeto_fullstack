const protocolo = 'http://';
const host = 'localhost:3000';
const filmesEndPoint = '/filmes';

async function obterFilmes() {
    //console.log("Teste 123");
    const URLcompleta = `${protocolo}${host}${filmesEndPoint}`;
    console.log (URLcompleta);
    const filmes = (await axios.get(URLcompleta)).data;
    //console.log(filmes);
    let tabela = document.querySelector('.filmes');
    let corpoTabela = tabela.getElementsByTagName('tbody')[0];
    for(let filme of filmes) {
        let linha = corpoTabela.insertRow(0);
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.celulaTitulo;
        celulaSinopse.innerHTML = filme.celulaSinopse;
    }
}