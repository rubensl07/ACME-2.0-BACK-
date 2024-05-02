const message = require('../config.js')
const DAO = require('../model/DAO/generos.js')

const setInserirNovoGenero = async function (dadosGenero, contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let novoGeneroJSON = {}
    if (dadosGenero.nome == ''|| dadosGenero.nome == undefined|| dadosGenero.nome == null||dadosGenero.nome.length > 30) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novoGenero = await DAO.insertGenero(dadosGenero)
            let id = await DAO.pegarUltimoId()
            if(novoGenero && id) {
                novoGeneroJSON.genero = dadosGenero
                novoGeneroJSON.status = message.SUCESS_CREATED_ITEM.status
                novoGeneroJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                novoGeneroJSON.message = message.SUCESS_CREATED_ITEM.message
                novoGeneroJSON.id = 'ID adicionado: '+id[0].id
                return novoGeneroJSON //201
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

const setExcluirGeneroFilme = async function (dadosBody,contentType) {
    if (String(contentType).toLowerCase() == 'application/json') {
        let excluirGeneroFilmeJSON={}
        let generoExcluido = await DAO.deleteGeneroFilme(dadosBody)
        if(generoExcluido){
            excluirGeneroFilmeJSON.status = message.SUCESS_ACCEPTED_ITEM.status
            excluirGeneroFilmeJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
            excluirGeneroFilmeJSON.message = message.SUCESS_ACCEPTED_ITEM.message
            return excluirGeneroFilmeJSON //202
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
}
const setInserirGeneroFilme = async function (dados,contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let generoAdicionadoJSON = {}
    if (dados.idFilme == ''|| dados.idFilme == undefined|| dados.idFilme == null||isNaN(dados.idFilme)||
        dados.idGenero == ''|| dados.idGenero == undefined|| dados.idGenero == null||isNaN(dados.idFilme)
){
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novoGeneroAdicionado = await DAO.insertGeneroFilme(dados)
            if(novoGeneroAdicionado) {
                generoAdicionadoJSON.genero = dados
                generoAdicionadoJSON.status = message.SUCESS_CREATED_ITEM.status
                generoAdicionadoJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                generoAdicionadoJSON.message = message.SUCESS_CREATED_ITEM.message
                return generoAdicionadoJSON //201
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
const setAtualizarGenero = async function (id, dadosGenero, contentType) {
    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novoGeneroJSON = {}
            if (dadosGenero.nome == ''|| dadosGenero.nome == undefined|| dadosGenero.nome == null||dadosGenero.nome.length > 30) {
               return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novoGenero = await DAO.updateGenero(id, dadosGenero)
                    if(novoGenero) {
                        novoGeneroJSON.genero = dadosGenero
                        novoGeneroJSON.status = message.SUCESS_ACCEPTED_ITEM.status
                        novoGeneroJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
                        novoGeneroJSON.message = message.SUCESS_ACCEPTED_ITEM.message
                        novoGeneroJSON.id = 'ID editado: '+id
                        return novoGeneroJSON //201
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error){
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}

const getListarGeneros = async function () {
    let generosJSON = {};
    let dadosGeneros = await DAO.selectAllGeneros();
        if (dadosGeneros) {
        if(dadosGeneros.length > 0) {
            generosJSON.generos = dadosGeneros;
            generosJSON.quantidade = dadosGeneros.length;
            generosJSON.status_code = 200;
            return generosJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarGeneroId = async function (search) {
    let generoJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosGenero = await DAO.selectByIdGenero(search);
        if (dadosGenero) {
            if (dadosGenero.length > 0) {
                generoJSON.genero = dadosGenero;
                generoJSON.status_code = 200;
                return generoJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
const getListarGenerosFilme = async function (search) {
    let generosJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosGeneros = await DAO.selectByIdFilme(search);
        if (dadosGeneros) {
            if (dadosGeneros.length > 0) {
                generosJSON.genero = dadosGeneros;
                generosJSON.status_code = 200;
                return generosJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    getListarGeneros,
    getBuscarGeneroId,
    getListarGenerosFilme,
    setExcluirGeneroFilme,
    setInserirGeneroFilme
}