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
                novaNacionalidadeJSON.status = message.SUCESS_CREATED_ITEM.status
                novaNacionalidadeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                novaNacionalidadeJSON.message = message.SUCESS_CREATED_ITEM.message
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
                        novaNacionalidadeJSON.status = message.SUCESS_ACCEPTED_ITEM.status
                        novaNacionalidadeJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
                        novaNacionalidadeJSON.message = message.SUCESS_ACCEPTED_ITEM.message
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
module.exports = {
    setInserirNovaNacionalidade,
    setAtualizarNacionalidade,
    getListarNacionalidades,
    getBuscarNacionalidadeId
}