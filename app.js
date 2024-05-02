var express = require ('express')
var bodyParser = require ('body-parser')
var cors = require('cors') 

const app = express()
app.use((request,response,next)=>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
})


const controllerFilmes = require('./controller/controller_filmes.js')
const controllerUsuarios = require('./controller/controller_usuarios.js')
const controllerFavoritos = require('./controller/controller_favoritos.js')
const controllerGeneros = require('./controller/controller_generos.js')
const controllerNacionalidades = require('./controller/controller_nacionalidades.js')
const controllerSexos = require('./controller/controller_sexos.js')
const controllerDiretores = require('./controller/controller_diretores.js')
const controllerClassificacaoIndicativa = require('./controller/controller_classificacoes_indicativas.js')
const controllerAtores = require('./controller/controller_atores.js')

const bodyParserJSON = bodyParser.json()

/** CRUD - CLASSIFICACOES INDICATIVAS **/
app.post('/acmefilmes/classificacoesindicativas', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovaClassificacaoIndicativa = await controllerClassificacaoIndicativa.setInserirNovaClassificacaoIndicativa(dadosBody,contentType)
    response.status(resultDadosNovaClassificacaoIndicativa.status_code)
    response.json(resultDadosNovaClassificacaoIndicativa)
})
app.put('/acmefilmes/classificacoesindicativas/:id', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let id = request.params.id
    let resultDadosUpdateClassificacaoIndicativa = await controllerClassificacaoIndicativa.setAtualizarClassificacaoIndicativa(id, dadosBody, contentType)

    response.status(resultDadosUpdateClassificacaoIndicativa.status_code)
    response.json(resultDadosUpdateClassificacaoIndicativa)
})
app.get('/acmefilmes/classificacoesindicativas', cors(), async function(request, response,){

    let dadosClassificacaoIndicativa = await controllerClassificacaoIndicativa.getListarClassificoesIndicativas();
    response.status(dadosClassificacaoIndicativa.status_code)
    response.json(dadosClassificacaoIndicativa)
})
app.get('/acmefilmes/classificacaoindicativa/:id', cors(), async function(request, response){
    let id = request.params.id
    let dadosClassificacaoIndicativa = await controllerClassificacaoIndicativa.getBuscarClassificacaoIndicativaId(id);
    
    response.status(dadosClassificacaoIndicativa.status_code);
    response.json(dadosClassificacaoIndicativa)
})

/** CRUD - FILMES **/
app.post('/acmefilmes/filme', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody,contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

app.delete('/acmefilmes/filme/:id', cors(), async function(request,response){

    let filmeId = request.params.id
    let resultDadosExcluirFilme = await controllerFilmes.setExcluirFilme(filmeId)

    response.status(resultDadosExcluirFilme.status_code)
    response.json(resultDadosExcluirFilme)
})
app.put('/acmefilmes/filme/:id', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let filmeId = request.params.id
    let resultDadosUpdateFilme = await controllerFilmes.setAtualizarFilme(filmeId, dadosBody, contentType)

    response.status(resultDadosUpdateFilme.status_code)
    response.json(resultDadosUpdateFilme)
})

app.get('/acmefilmes/filmes', cors(), async function(request, response,){

    let dadosFilmes = await controllerFilmes.getListarFilmes();
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})
app.get('/acmefilmes/filme/:id', cors(), async function(request, response){
    let filmeId = request.params.id
    let dadosFilmes = await controllerFilmes.getBuscarFilmeId(filmeId);
    
    response.status(dadosFilmes.status_code);
    response.json(dadosFilmes)
})
app.get('/acmefilmes/filme', cors(), async function(request, response,){
    let pesquisa = request.query.search
    console.log(pesquisa);
    let dadosFilmes = await controllerFilmes.getPesquisarFilme(pesquisa);
    response.status(dadosFilmes.status_code);
    response.json(dadosFilmes)
})
app.post('/acmefilmes/filmes/filter', cors(), bodyParserJSON, async function(request, response,){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let dadosFilmes = await controllerFilmes.getFiltrarFilmes(dadosBody, contentType);
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})
app.get('/acmefilmes/filmes/sortby/:sort', cors(), async function(request, response,){
    let sort = request.params.sort
    let dadosFilmes = await controllerFilmes.getListarFilmesSort(sort);
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})
app.get('/acmefilmes/filmediretor/:id', cors(), async function(request, response,){
    let diretorId = request.params.id

    let dadosFilmes = await controllerFilmes.getExibirFilmesDiretor(diretorId);
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})
app.get('/acmefilmes/filmeator/:id', cors(), async function(request, response,){
    let atorId = request.params.id

    let dadosFilmes = await controllerFilmes.getExibirFilmesAtor(atorId);
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})



/** CRUD - GÊNEROS **/
app.get('/acmefilmes/generos', cors(), async function(request, response,){

    let dadosGeneros = await controllerGeneros.getListarGeneros();
    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})
app.get('/acmefilmes/genero/:id', cors(), async function(request, response,){
    let generoId = request.params.id

    let dadosGenero = await controllerGeneros.getBuscarGeneroId(generoId);
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})
app.post('/acmefilmes/genero', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody,contentType)
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})
app.post('/acmefilmes/generofilme', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovaConexao = await controllerGeneros.setInserirGeneroFilme(dadosBody,contentType)
    response.status(resultDadosNovaConexao.status_code)
    response.json(resultDadosNovaConexao)
})
app.delete('/acmefilmes/generofilme', cors(),bodyParserJSON,async function(request,response){
    
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosExcluirGeneroFilme = await controllerGeneros.setExcluirGeneroFilme(dadosBody,contentType)

    response.status(resultDadosExcluirGeneroFilme.status_code)
    response.json(resultDadosExcluirGeneroFilme)
})
app.put('/acmefilmes/genero/:id', cors(), bodyParserJSON,async function(request,response){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let generoId = request.params.id
    let resultDadosUpdateUsuario = await controllerGeneros.setAtualizarGenero(generoId, dadosBody, contentType)
    response.json(resultDadosUpdateUsuario)
})
app.get('/acmefilmes/generosfilme/:id', cors(), async function(request, response,){
    let filmeId = request.params.id

    let dadosGenero = await controllerGeneros.getListarGenerosFilme(filmeId);
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})
/** CRUD - NACIONALIDADES **/
app.post('/acmefilmes/nacionalidade', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovaNacionalidade = await controllerNacionalidades.setInserirNovaNacionalidade(dadosBody, contentType);
    response.status(resultDadosNovaNacionalidade.status_code);
    response.json(resultDadosNovaNacionalidade);
});

app.put('/acmefilmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let id = request.params.id;

    let resultDadosUpdateNacionalidade = await controllerNacionalidades.setAtualizarNacionalidade(id, dadosBody, contentType);
    response.status(resultDadosUpdateNacionalidade.status_code);
    response.json(resultDadosUpdateNacionalidade);
});

app.get('/acmefilmes/nacionalidades', cors(), async function(request, response) {
    let dadosNacionalidades = await controllerNacionalidades.getListarNacionalidades();
    response.status(dadosNacionalidades.status_code);
    response.json(dadosNacionalidades);
});

app.get('/acmefilmes/nacionalidade/:id', cors(), async function(request, response) {
    let id = request.params.id;
    let dadosNacionalidade = await controllerNacionalidades.getBuscarNacionalidadeId(id);
    
    response.status(dadosNacionalidade.status_code);
    response.json(dadosNacionalidade);
});


/** CRUD - SEXOS **/
app.post('/acmefilmes/sexo', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoSexo = await controllerSexos.setInserirNovoSexo(dadosBody, contentType);
    response.status(resultDadosNovoSexo.status_code);
    response.json(resultDadosNovoSexo);
});

app.put('/acmefilmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let id = request.params.id;

    let resultDadosUpdateSexo = await controllerSexos.setAtualizarSexo(id, dadosBody, contentType);
    response.status(resultDadosUpdateSexo.status_code);
    response.json(resultDadosUpdateSexo);
});

app.get('/acmefilmes/sexos', cors(), async function(request, response) {
    let dadosSexos = await controllerSexos.getListarSexos();
    response.status(dadosSexos.status_code);
    response.json(dadosSexos);
});

app.get('/acmefilmes/sexo/:id', cors(), async function(request, response) {
    let id = request.params.id;
    let dadosSexo = await controllerSexos.getBuscarSexoId(id);
    
    response.status(dadosSexo.status_code);
    response.json(dadosSexo);
});


/** CRUD - DIRETORES **/
app.post('/acmefilmes/diretor', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoDiretor = await controllerDiretores.setInserirNovoDiretor(dadosBody, contentType);
    response.status(resultDadosNovoDiretor.status_code);
    response.json(resultDadosNovoDiretor);
});

app.put('/acmefilmes/diretor/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let id = request.params.id;

    let resultDadosUpdateDiretor = await controllerDiretores.setAtualizarDiretor(id, dadosBody, contentType);
    response.status(resultDadosUpdateDiretor.status_code);
    response.json(resultDadosUpdateDiretor);
});

app.get('/acmefilmes/diretores', cors(), async function(request, response) {
    let dadosDiretores = await controllerDiretores.getListarDiretores();
    response.status(dadosDiretores.status_code);
    response.json(dadosDiretores);
});

app.get('/acmefilmes/diretor/:id', cors(), async function(request, response) {
    let id = request.params.id;
    let dadosDiretor = await controllerDiretores.getBuscarDiretorId(id);
    
    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);
});
app.get('/acmefilmes/diretorfilme/:id', cors(), async function(request, response,){
    let filmeId = request.params.id

    let dadosDiretores = await controllerDiretores.getExibirDiretoresFilme(filmeId);
    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)
})

/** CRUD - ATORES **/
app.post('/acmefilmes/ator', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoAtor = await controllerAtores.setInserirnovoAtor(dadosBody, contentType);
    response.status(resultDadosNovoAtor.status_code);
    response.json(resultDadosNovoAtor);
});

app.put('/acmefilmes/ator/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let id = request.params.id;

    let resultDadosUpdateAtor = await controllerAtores.setAtualizarAtor(id, dadosBody, contentType);
    response.status(resultDadosUpdateAtor.status_code);
    response.json(resultDadosUpdateAtor);
});

app.get('/acmefilmes/atores', cors(), async function(request, response) {
    let dadosAtores = await controllerAtores.getListarAtores();
    response.status(dadosAtores.status_code);
    response.json(dadosAtores);
});

app.get('/acmefilmes/ator/:id', cors(), async function(request, response) {
    let id = request.params.id;
    let dadosAtor = await controllerAtores.getBuscarAtorId(id);
    
    response.status(dadosAtor.status_code);
    response.json(dadosAtor);
});
app.get('/acmefilmes/atorfilme/:id', cors(), async function(request, response,){
    let filmeId = request.params.id

    let dadosAtores = await controllerAtores.getExibirAtoresFilme(filmeId);
    response.status(dadosAtores.status_code)
    response.json(dadosAtores)
})


/** CRUD - USUÁRIOS **/
app.get('/acmefilmes/usuarios', cors(), async function(request, response,){

    let dadosUsuarios = await controllerUsuarios.getListarUsuarios();
    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})
app.get('/acmefilmes/usuario/:id', cors(), async function(request, response){
    let usuarioId = request.params.id
    let dadosUsuario = await controllerUsuarios.getBuscarUsuario(usuarioId);

    response.status(dadosUsuario.status_code);
    response.json(dadosUsuario)
})
app.post('/acmefilmes/usuario', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoUsuario = await controllerUsuarios.setInserirNovoUsuario(dadosBody,contentType)
    response.status(resultDadosNovoUsuario.status_code)
    response.json(resultDadosNovoUsuario)
})
app.delete('/acmefilmes/usuario/:id', cors(), async function(request,response){

    let usuarioId = request.params.id
    let resultDadosExcluirUsuario = await controllerUsuarios.setExcluirUsuario(usuarioId)

    response.json(resultDadosExcluirUsuario)
})
app.put('/acmefilmes/usuario/:id', cors(), bodyParserJSON,async function(request,response){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let usuarioId = request.params.id
    let resultDadosUpdateUsuario = await controllerUsuarios.setAtualizarUsuario(usuarioId, dadosBody, contentType)
    response.json(resultDadosUpdateUsuario)
})

/** CRUD - FAVORITOS **/
app.get('/acmefilmes/favoritos', cors(), async function(request, response,){

    let dadosFavoritos = await controllerFavoritos.getListarFavoritos();
    response.status(dadosFavoritos.status_code)
    response.json(dadosFavoritos)
})
app.get('/acmefilmes/favorito/:id', cors(), async function(request, response){

    let id = request.params.id
    let dadosFavorito = await controllerFavoritos.getFavoritoId(id);
    
    response.status(dadosFavorito.status_code);
    response.json(dadosFavorito)
})
app.get('/acmefilmes/favoritosUsuario/:id', cors(), async function(request, response){

    let usuarioId = request.params.id
    let dadosFavorito = await controllerFavoritos.getFavoritosUsuario(usuarioId);
    
    response.status(dadosFavorito.status_code);
    response.json(dadosFavorito)
})
app.post('/acmefilmes/favorito', cors(), bodyParserJSON,async function(request,response){

    
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoFavorito = await controllerFavoritos.setInserirNovoFavorito(dadosBody,contentType)
    response.status(resultDadosNovoFavorito.status_code)
    response.json(resultDadosNovoFavorito)
})
app.delete('/acmefilmes/favoritos', cors(), bodyParserJSON,async function(request,response){

    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosExcluirFavorito = await controllerFavoritos.setExcluirFavorito(dadosBody,contentType)
    response.json(resultDadosExcluirFavorito)
})
app.delete('/acmefilmes/favoritosUsuario/:id', cors(), async function(request,response){

    let usuarioId = request.params.id


    let resultDadosExcluirFavorito = await controllerFavoritos.setExcluirFavoritosUsuario(usuarioId)
    response.json(resultDadosExcluirFavorito)
})
app.delete('/acmefilmes/favoritosFilme/:id', cors(), async function(request,response){

    let filmeId = request.params.id

    let resultDadosExcluirFavorito = await controllerFavoritos.setExcluirFavoritosFilme(filmeId)
    response.json(resultDadosExcluirFavorito)
})

const port = process.env.PORT || 8080
app.listen(port,function(){
    console.log("API FUNFANDO!!\nPorta "+port)
})

