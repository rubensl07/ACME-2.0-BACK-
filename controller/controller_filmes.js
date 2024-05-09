const message = require('../config.js')
const DAO = require('../model/DAO/filme.js')
const classificacoesIndicativasDAO = require('../model/DAO/classificacoes_indicativas.js')
const generosDAO = require('../model/DAO/generos.js')
const diretoresDAO = require('../model/DAO/diretores.js')
const atoresDAO = require('../model/DAO/atores.js')


const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {
    //Validação de contentType. Apenas application/json
    if (String(contentType).toLowerCase() == 'application/json'){

    
    //função para inserir um novo filme
    let novoFilmeJSON = {}

    if (dadosFilme.nome == ''            || dadosFilme.nome == undefined            || dadosFilme.nome == null            ||dadosFilme.nome.length > 80                       || 
        dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         ||dadosFilme.sinopse.length > 65000       ||
        dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         ||dadosFilme.duracao.length > 8           ||
        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null ||dadosFilme.data_lancamento.length != 10 ||
        dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       ||dadosFilme.foto_capa.length > 200         
        ) {

       return message.ERROR_REQUIRED_FIELDS //400
    } else {

        let validateStatus = false

        if (dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != ''   &&
            dadosFilme.data_relancamento != undefined
            ) {
            if (dadosFilme.data_relancamento.length != 10) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else{
                validateStatus = true
            }
        } else {
            validateStatus =  true

        }
        if(validateStatus){
                    // encaminha para o DAO para inserir no banco

            let novoFilme = await DAO.insertFilme(dadosFilme)
            let id = await DAO.pegarUltimoId()

            if(novoFilme && id) {
                //retorno dos dados
                novoFilmeJSON.filme = dadosFilme
                novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message
                novoFilmeJSON.id = +id[0].id

                return novoFilmeJSON //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }


    }
} else {
    return message.ERROR_CONTENT_TYPE // 415
}
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}

const setExcluirFilme = async function (id) {
    let excluirFilmeJSON={}
    let filmeExcluido = await DAO.deleteFilme(id)
    if(filmeExcluido){
        excluirFilmeJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
        excluirFilmeJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
        excluirFilmeJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
        return excluirFilmeJSON //202
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

const setAtualizarFilme = async function (id, dadosFilme, contentType) {

    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novoFilmeJSON = {}

            if (dadosFilme.nome == ''            || dadosFilme.nome == undefined            || dadosFilme.nome == null            ||dadosFilme.nome.length > 80                       || 
            dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         ||dadosFilme.sinopse.length > 65000       ||
            dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         ||dadosFilme.duracao.length > 8           ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null ||dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       ||dadosFilme.foto_capa.length > 200         
            ) {
               return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let validateStatus = false
                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != ''   &&
                    dadosFilme.data_relancamento != undefined
                    ) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else{
                        validateStatus = true
                    }
                } else {
                    validateStatus =  true
                }

                if(validateStatus){
                    let novoFilme = await DAO.updateFilme(id, dadosFilme)
                    if(novoFilme) {
                        novoFilmeJSON.filme = dadosFilme
                        novoFilmeJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
                        novoFilmeJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
                        novoFilmeJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
                        novoFilmeJSON.id = id

                        return novoFilmeJSON //201
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error){
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}

const getListarFilmes = async function () {
    const dadosClassificacoesIndicativas = await classificacoesIndicativasDAO.selectAllClassificacoesIndicativas();

    let filmesJSON = {};
    let dadosFilmes = await DAO.selectAllFilmes();
        if (dadosFilmes) {
        if(dadosFilmes.length > 0) {
            for (let index = 0; index < dadosFilmes.length; index++) {
                const search = dadosFilmes[index].id
                const dadosGeneros = await generosDAO.selectByIdFilme(search);
                const dadosDiretores = await diretoresDAO.selectByIdFilme(search);
                const dadosAtores = await atoresDAO.selectByIdFilme(search);
 
                let classificacaoIndicativaJSON = {}
                dadosClassificacoesIndicativas.forEach(element => {
                    if (element.id == dadosFilmes[index].id_classificacao_indicativa) {
                        classificacaoIndicativaJSON = element
                    }
                });
                
                let listaGeneros = []
                dadosGeneros.forEach(genero=>{
                    listaGeneros.push(genero)
                })
                let listaDiretores = []
                dadosDiretores.forEach(diretor =>{
                    listaDiretores.push(diretor)
                })
                let listaAtores = []
                dadosAtores.forEach(ator =>{
                    listaAtores.push(ator)
                })
                
                dadosFilmes[index].generos = listaGeneros
                dadosFilmes[index].diretores = listaDiretores
                dadosFilmes[index].atores = listaAtores
                delete dadosFilmes[index].id_classificacao_indicativa
                 dadosFilmes[index].classificacaoIndicativa = classificacaoIndicativaJSON
            }

            filmesJSON.filmes = dadosFilmes;
            filmesJSON.quantidade = dadosFilmes.length;
            filmesJSON.status_code = 200;
            return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getListarFilmesSort = async function (sort) {

    //Cria um objeto JSON
    let filmesJSON = {};
    //Chama a função do DAO que retorna os filmes do BD
    let dadosFilmes = await DAO.selectAllFilmesSort(sort);

        //Validação para verificar se existem dados de retorno
        if (dadosFilmes) {
        if(dadosFilmes.length > 0) {
            //Se devolveu, cria o JSON para retornar para o app
            filmesJSON.filmes = dadosFilmes;
            filmesJSON.quantidade = dadosFilmes.length;
            filmesJSON.status_code = 200;
            return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarFilmeId = async function (search) {
    const dadosClassificacoesIndicativas = await classificacoesIndicativasDAO.selectAllClassificacoesIndicativas();
    const dadosGeneros = await generosDAO.selectByIdFilme(search);
    const dadosDiretores = await diretoresDAO.selectByIdFilme(search);
    const dadosAtores = await atoresDAO.selectByIdFilme(search);

    let idFilme = search;

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let filmeJSON = {};
        let dadosFilme = await DAO.selectByIdFilme(idFilme);
        if (dadosFilme) {
            if (dadosFilme.length > 0) {
                 let classificacaoIndicativaJSON = {}
                 dadosClassificacoesIndicativas.forEach(element => {
                     if (element.id == dadosFilme[0].id_classificacao_indicativa) {
                         classificacaoIndicativaJSON = element
                    }
                    });
                    let listaGeneros = []
                    dadosGeneros.forEach(genero=>{
                       listaGeneros.push(genero)
                    })
                let listaDiretores = []
                    dadosDiretores.forEach(diretor =>{
                    listaDiretores.push(diretor)
                 })
                 let listaAtores = []
                 dadosAtores.forEach(ator =>{
                    listaAtores.push(ator)
                 })
                 delete dadosFilme[0].id_classificacao_indicativa
                    dadosFilme[0].classificacaoIndicativa = classificacaoIndicativaJSON
                    dadosFilme[0].generos = listaGeneros
                    dadosFilme[0].diretores = listaDiretores
                    dadosFilme[0].atores = listaAtores


                    
                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200;
                return filmeJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}

const getPesquisarFilme = async function (search) {
    let filmesJSON = {}

        let dadosFilme = await DAO.selectPesquisarFilmes(search);
        console.log(dadosFilme);

        if (dadosFilme) {
            if(dadosFilme.length>0){
                filmesJSON.filmes = dadosFilme;
                filmesJSON.quantidade = dadosFilme.length;
                filmesJSON.status_code = 200;
                return filmesJSON;
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
}

const getFiltrarFilmes = async function (filter, contentType) {

    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let filmesJSON = {};

            let listaGeneros = []
            filter.generos.forEach(genero => {
                if(genero.checked){
                    listaGeneros.push(genero.id)
                }
            });
            const generosSelecionados = listaGeneros.join(',')
            let search = filter.search
            let sql = `SELECT Filmes.id,Filmes.nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,foto_fundo,cor,id_classificacao_indicativa AS classificacao, (SELECT GROUP_CONCAT(Generos.nome SEPARATOR ', ') FROM filme_genero INNER JOIN Generos ON filme_genero.id_genero = Generos.id WHERE filme_genero.id_filme = Filmes.id) AS Genero FROM Filmes LEFT JOIN filme_genero ON Filmes.id = filme_genero.id_filme LEFT JOIN Generos ON filme_genero.id_genero = Generos.id LEFT JOIN ator_filme ON filmes.id = ator_filme.id_filme LEFT JOIN atores ON ator_filme.id_ator = atores.id LEFT JOIN diretor_filme ON filmes.id = diretor_filme.id_filme LEFT JOIN diretores ON diretor_filme.id_diretor = diretores.id WHERE (Filmes.nome LIKE '%${search}%' OR Filmes.sinopse LIKE '%${search}%' OR Atores.nome LIKE '%${search}%' OR Diretores.nome LIKE '%${search}%') AND (Filmes.id_classificacao_indicativa<=${filter.maxAge}) AND (Filmes.data_lancamento>='0001-01-01' AND Filmes.data_lancamento<='9999-12-31') AND (Generos.id IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21)) GROUP BY Filmes.id;`

            if(listaGeneros.length>0){
                sql = sql.replace('(0)',`(${generosSelecionados})`)
            }
            if(filter.dataMinima){
                sql =sql.replace('0001-01-01',`${filter.dataMinima}`)
            }
            if(filter.dataMaxima){
                sql =sql.replace('9999-12-31',`${filter.dataMaxima}`)
            }

            let dadosFilmes = await DAO.selectFilterFilmes(sql);
                if (dadosFilmes) {
                if(dadosFilmes.length > 0) {
                    filmesJSON.filmes = dadosFilmes;
                    filmesJSON.quantidade = dadosFilmes.length;
                    filmesJSON.status_code = 200;
                    return filmesJSON;
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error){
        console.log(error)
    return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
}
}
const getExibirFilmesDiretor = async function(search){
    let filmesJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosFilmes = await DAO.selectByIdDiretor(search);
        if (dadosFilmes) {
            if (dadosFilmes.length > 0) {
                filmesJSON.filmes = dadosFilmes;
                filmesJSON.status_code = 200;
                return filmesJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}
const getExibirFilmesAtor = async function(search){
    let filmesJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosFilmes = await DAO.selectByIdAtor(search);
        if (dadosFilmes) {
            if (dadosFilmes.length > 0) {
                filmesJSON.filmes = dadosFilmes;
                filmesJSON.status_code = 200;
                return filmesJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

const setAdicionarAtorFilme = async function (dados,contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let atorAdicionadoJSON = {}
    if (dados.idFilme == ''|| dados.idFilme == undefined|| dados.idFilme == null||isNaN(dados.idFilme)||
        dados.idAtor == ''|| dados.idAtor == undefined|| dados.idAtor == null||isNaN(dados.idAtor)
){
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novoAtorAdicionado = await DAO.adicionarAtorFilme(dados)
            if(novoAtorAdicionado) {
                atorAdicionadoJSON.ator = dados
                atorAdicionadoJSON.status = message.SUCCESS_CREATED_ITEM.status
                atorAdicionadoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                atorAdicionadoJSON.message = message.SUCCESS_CREATED_ITEM.message
                return atorAdicionadoJSON //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
    }
} else {
    return message.ERROR_CONTENT_TYPE // 415
}
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}
const setRemoverAtorFilme = async function (dados,contentType) {
    try{
        if (String(contentType).toLowerCase() == 'application/json') {
            let excluirAtorFilmeJSON={}
                        if (dados.idFilme == '' || dados.idFilme == undefined || dados.idFilme == null || isNaN(dados.idFilme) ||
                dados.idAtor == '' || dados.idAtor == undefined || dados.idAtor == null || isNaN(dados.idAtor)) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {
            let atorExcluido = await DAO.removerAtorFilme(dados)
            if(atorExcluido){
                excluirAtorFilmeJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
                excluirAtorFilmeJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
                excluirAtorFilmeJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
                return excluirAtorFilmeJSON //202
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; //500 - Erro na controller
    }
}

const setAdicionarDiretorFilme = async function (dados, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let diretorAdicionadoJSON = {};
            if (dados.idFilme == '' || dados.idFilme == undefined || dados.idFilme == null || isNaN(dados.idFilme) ||
                dados.idDiretor == '' || dados.idDiretor == undefined || dados.idDiretor == null || isNaN(dados.idDiretor)) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {
                let novoDiretorAdicionado = await DAO.adicionarDiretorFilme(dados);
                if (novoDiretorAdicionado) {
                    diretorAdicionadoJSON.diretor = dados;
                    diretorAdicionadoJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    diretorAdicionadoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    diretorAdicionadoJSON.message = message.SUCCESS_CREATED_ITEM.message;
                    return diretorAdicionadoJSON; //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; //500 - Erro na controller
    }
};

const setRemoverDiretorFilme = async function (dados, contentType) {
    try{
        if (String(contentType).toLowerCase() == 'application/json') {
            let excluirDiretorFilmeJSON = {};
            if (dados.idFilme == '' || dados.idFilme == undefined || dados.idFilme == null || isNaN(dados.idFilme) ||
                dados.idDiretor == '' || dados.idDiretor == undefined || dados.idDiretor == null || isNaN(dados.idDiretor)) {
                return message.ERROR_REQUIRED_FIELDS; //400
            } else {
            let diretorExcluido = await DAO.removerDiretorFilme(dados);
            if (diretorExcluido) {
                excluirDiretorFilmeJSON.status = message.SUCCESS_ACCEPTED_ITEM.status;
                excluirDiretorFilmeJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code;
                excluirDiretorFilmeJSON.message = message.SUCCESS_ACCEPTED_ITEM.message;
                return excluirDiretorFilmeJSON; //202
            } else {
                return message.ERROR_NOT_FOUND; //404
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch(error){
        return message.ERROR_INTERNAL_SERVER; //500 - Erro na controller
    }
};


module.exports = {
    setInserirNovoFilme,
    setExcluirFilme,
    setAtualizarFilme,
    getListarFilmes,
    getBuscarFilmeId,
    getPesquisarFilme,
    getFiltrarFilmes,
    getListarFilmesSort,
    getExibirFilmesDiretor,
    getExibirFilmesAtor,
    setAdicionarAtorFilme,
    setRemoverAtorFilme,
    setAdicionarDiretorFilme,
    setRemoverDiretorFilme
}