const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(cors());

async function conectarMongoDB(){
    await mongoose.connect(`mongodb+srv://admin:admin@cluster0.nitc5vb.mongodb.net/?retryWrites=true&w=majority`)
}

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
    login: {type: String, unique: true, required: true},
    senha: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

//Acesso para riquisição http-get /oi
app.get('/oi', (req, res) => {res.send("Oi!")});

//Acesso para requisição http-get /filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes);
});

//Acesso para requisição http-post /filmes, ou seja, vamos inserir um novo filme na lista EMMMMMMM MEMORIAAAAAAA
app.post('/filmes', async (req, res) => {
    //Obter dados que serão inseridos
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //Montar o objeto JSON que será inserido
    const filme = new Filme({titulo: titulo, sinopse: sinopse});
    //Inserir o novo filme no vetor filmes
    await filme.save();
    //Trazemos do banco a coleção atualizada
    const filmes = await Filme.find();
    //Apenas para conferir
    res.json(filmes);
});
app.post('/signup', async (req, res) => {
    try{
    const login = req.body.login;
    const senha = req.body.senha;
    const criptografada = await bcrypt.hash(senha, 10);
    const usuario = new Usuario({login: login, senha: criptografada});
    const respostaMongo = await usuario.save();
    console.log(respostaMongo);
    res.status(201).end();
    }
    catch(e){
        console.log(e);
        res.status(409).end();
    }
})

app.listen(3000, () => {
    try{
        conectarMongoDB();
        console.log("Conexão OK e aplicativo up & running!");
        }
    catch (e){
        console.log("Erro: ", e);
        }
})