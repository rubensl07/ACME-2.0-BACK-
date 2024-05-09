const message = require('../config.js')
const DAO = require('../model/DAO/nacionalidades.js')

const setInserirNovaNacionalidade = async function (dadosNacionalidade, contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let novaNacionalidadeJSON = {}
    if (dadosNacionalidade.pais == ''|| dadosNacionalidade.pais == undefined|| dadosNacionalidade.pais == null||dadosNacionalidade.pais.length > 50) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novaNacionalidade = await DAO.insertNacionalidade(dadosNacionalidade)
            let id = await DAO.pegarUltimoId()
            if(novaNacionalidade && id) {
                novaNacionalidadeJSON.nacionalidade = dadosNacionalidade
                novaNacionalidadeJSON.status = message.SUCCESS_CREATED_ITEM.status
                novaNacionalidadeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novaNacionalidadeJSON.message = message.SUCCESS_CREATED_ITEM.message
                novaNacionalidadeJSON.id = 'ID adicionado: '+id[0].id
                return novaNacionalidadeJSON //201
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

const setAtualizarNacionalidade = async function (id, dadosNacionalidade, contentType) {
    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novaNacionalidadeJSON = {}
            if (dadosNacionalidade.pais == ''|| dadosNacionalidade.pais == undefined|| dadosNacionalidade.pais == null||dadosNacionalidade.pais.length > 30) {
               return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novaNacionalidade = await DAO.updateNacionalidade(id, dadosNacionalidade)
                    if(novaNacionalidade) {
                        novaNacionalidadeJSON.nacionalidade = dadosNacionalidade
                        novaNacionalidadeJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
                        novaNacionalidadeJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
                        novaNacionalidadeJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
                        novaNacionalidadeJSON.id = 'ID editado: '+id
                        return novaNacionalidadeJSON //201
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

const setExcluirNacionalidade = async function (id) {
    let excluirNacionalidadeJSON={}
    let nacionalidadeExcluida = await DAO.deleteNacionalidade(id)
    if(nacionalidadeExcluida){
        excluirNacionalidadeJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
        excluirNacionalidadeJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
        excluirNacionalidadeJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
        return excluirNacionalidadeJSON //202
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}
const getListarNacionalidades = async function () {
    let nacionalidadesJSON = {};
    let dadosNacionalidades = await DAO.selectAllNacionalidades();
        if (dadosNacionalidades) {
        if(dadosNacionalidades.length > 0) {
            nacionalidadesJSON.nacionalidades = dadosNacionalidades;
            nacionalidadesJSON.quantidade = dadosNacionalidades.length;
            nacionalidadesJSON.status_code = 200;
            return nacionalidadesJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarNacionalidadeId = async function (search) {
    let nacionalidadeJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosNacionalidade = await DAO.selectByIdNacionalidade(search);

        if (dadosNacionalidade) {
            if (dadosNacionalidade.length > 0) {
                nacionalidadeJSON.nacionalidade = dadosNacionalidade;
                nacionalidadeJSON.status_code = 200;
                return nacionalidadeJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
const setInserirNacionalidadeAtor = async function (dados,contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let nacionalidadeAdicionadaJSON = {}
    if (dados.idAtor == ''|| dados.idAtor == undefined|| dados.idAtor == null||isNaN(dados.idAtor)||
        dados.idNacionalidade == ''|| dados.idNacionalidade == undefined|| dados.idNacionalidade == null||isNaN(dados.idNacionalidade)
){
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novaNacionalidadeAdicionada = await DAO.insertNacionalidadeAtor(dados)
            if(novaNacionalidadeAdicionada) {
                nacionalidadeAdicionadaJSON.nacionalidade = dados
                nacionalidadeAdicionadaJSON.status = message.SUCCESS_CREATED_ITEM.status
                nacionalidadeAdicionadaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                nacionalidadeAdicionadaJSON.message = message.SUCCESS_CREATED_ITEM.message
                return nacionalidadeAdicionadaJSON //201
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
const setExcluirNacionalidadeAtor = async function (dadosBody,contentType) {
    if (String(contentType).toLowerCase() == 'application/json') {
        let excluirNacionalidadeAtorJSON={}
        let nacionalidadeExcluida = await DAO.deleteNacionalidadeAtor(dadosBody)
        if(nacionalidadeExcluida){
            excluirNacionalidadeAtorJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
            excluirNacionalidadeAtorJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
            excluirNacionalidadeAtorJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
            return excluirNacionalidadeAtorJSON //202
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
}
const setInserirNacionalidadeDiretor = async function (dados,contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let nacionalidadeAdicionadaJSON = {}
    if (dados.idDiretor == ''|| dados.idDiretor == undefined|| dados.idDiretor == null||isNaN(dados.idDiretor)||
        dados.idNacionalidade == ''|| dados.idNacionalidade == undefined|| dados.idNacionalidade == null||isNaN(dados.idNacionalidade)
){
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novaNacionalidadeAdicionada = await DAO.insertNacionalidadeDiretor(dados)
            if(novaNacionalidadeAdicionada) {
                nacionalidadeAdicionadaJSON.nacionalidade = dados
                nacionalidadeAdicionadaJSON.status = message.SUCCESS_CREATED_ITEM.status
                nacionalidadeAdicionadaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                nacionalidadeAdicionadaJSON.message = message.SUCCESS_CREATED_ITEM.message
                return nacionalidadeAdicionadaJSON //201
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
const setExcluirNacionalidadeDiretor = async function (dadosBody,contentType) {
    if (String(contentType).toLowerCase() == 'application/json') {
        let excluirNacionalidadeDiretorJSON={}
        let nacionalidadeExcluida = await DAO.deleteNacionalidadeDiretor(dadosBody)
        if(nacionalidadeExcluida){
            excluirNacionalidadeDiretorJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
            excluirNacionalidadeDiretorJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
            excluirNacionalidadeDiretorJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
            return excluirNacionalidadeDiretorJSON //202
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
}



module.exports = {
    setInserirNovaNacionalidade,
    setAtualizarNacionalidade,
    setExcluirNacionalidade,
    getListarNacionalidades,
    getBuscarNacionalidadeId,
    setInserirNacionalidadeAtor,
    setExcluirNacionalidadeAtor,
    setInserirNacionalidadeDiretor,
    setExcluirNacionalidadeDiretor,
}