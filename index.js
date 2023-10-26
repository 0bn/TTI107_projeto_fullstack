const express = require('express');
const app = express();
app.use(express.json());

let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]

//Acesso para riquisição http-get /oi
app.get('/oi', (req, res) => {res.send("Oi!")});

//Acesso para requisição http-get /filmes
app.get('/filmes', (req, res) => {res.send(filmes)});

//Acesso para requisição http-post /filmes, ou seja, vamos inserir um novo filme na lista EMMMMMMM MEMORIAAAAAAA
app.post('/filmes', (req, res) => {
    //Obter dados que serão inseridos
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //Montar o objeto JSON que seré inserido
    const filme = {titulo: titulo, sinopse: sinopse};
    //Inserir o novo filme no vetor filmes
    filmes.push(filme);
    //Apenas para conferir
    res.send(filmes);
});


app.listen(3000, () => console.log("App subido & rodando!"));