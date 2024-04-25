const message = require('../config.js')
const DAO = require('../model/DAO/classificacoes_indicativas.js')

const setInserirNovaClassificacaoIndicativa = async function (dadosClassificacaoIndicativa, contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let novaClassificacaoIndicativaJSON = {}
    if (dadosClassificacaoIndicativa.idade == ''|| dadosClassificacaoIndicativa.idade == undefined|| dadosClassificacaoIndicativa.idade == null||dadosClassificacaoIndicativa.idade.length > 2 ||
        dadosClassificacaoIndicativa.icone == ''|| dadosClassificacaoIndicativa.icone == undefined|| dadosClassificacaoIndicativa.icone == null||dadosClassificacaoIndicativa.idade.length > 200 ||
        dadosClassificacaoIndicativa.descricao == ''|| dadosClassificacaoIndicativa.descricao == undefined|| dadosClassificacaoIndicativa.descricao == null||dadosClassificacaoIndicativa.descricao.length > 65000 
) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novaClassificacaoIndicativa = await DAO.insertClassificacaoIndicativa(dadosClassificacaoIndicativa)
            let id = await DAO.pegarUltimoId()
            if(novaClassificacaoIndicativa && id) {
                novaClassificacaoIndicativaJSON.classificacaoIndicativa = dadosClassificacaoIndicativa
                novaClassificacaoIndicativaJSON.status = message.SUCESS_CREATED_ITEM.status
                novaClassificacaoIndicativaJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                novaClassificacaoIndicativaJSON.message = message.SUCESS_CREATED_ITEM.message
                novaClassificacaoIndicativaJSON.id = 'ID adicionado: '+id[0].id
                return novaClassificacaoIndicativaJSON //201
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

const setAtualizarClassificacaoIndicativa = async function (id, dadosClassificacaoIndicativa, contentType) {
    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novaClassificacaoIndicativaJSON = {}
            if (dadosClassificacaoIndicativa.idade == ''|| dadosClassificacaoIndicativa.idade == undefined|| dadosClassificacaoIndicativa.idade == null||dadosClassificacaoIndicativa.idade.length > 2 ||
            dadosClassificacaoIndicativa.icone == ''|| dadosClassificacaoIndicativa.icone == undefined|| dadosClassificacaoIndicativa.icone == null||dadosClassificacaoIndicativa.idade.length > 200 ||
            dadosClassificacaoIndicativa.descricao == ''|| dadosClassificacaoIndicativa.descricao == undefined|| dadosClassificacaoIndicativa.descricao == null||dadosClassificacaoIndicativa.descricao.length > 65000 
    ) {
                       return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novaClassificacaoIndicativa = await DAO.updateClassificacaoIndicativa(id, dadosClassificacaoIndicativa)
                    if(novaClassificacaoIndicativa) {
                        novaClassificacaoIndicativaJSON.classificacaoIndicativa = dadosClassificacaoIndicativa
                        novaClassificacaoIndicativaJSON.status = message.SUCESS_ACCEPTED_ITEM.status
                        novaClassificacaoIndicativaJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
                        novaClassificacaoIndicativaJSON.message = message.SUCESS_ACCEPTED_ITEM.message
                        novaClassificacaoIndicativaJSON.id = 'ID editado: '+id
                        return novaClassificacaoIndicativaJSON //201
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

const getListarClassificoesIndicativas = async function () {
    let classificacoesIndicativasJSON = {};
    let dadosClassificacoesIndicativas = await DAO.selectAllClassificacoesIndicativas();
        if (dadosClassificacoesIndicativas) {
        if(dadosClassificacoesIndicativas.length > 0) {
            classificacoesIndicativasJSON.classificoesIndicativas = dadosClassificacoesIndicativas;
            classificacoesIndicativasJSON.quantidade = dadosClassificacoesIndicativas.length;
            classificacoesIndicativasJSON.status_code = 200;
            return classificacoesIndicativasJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarClassificacaoIndicativaId = async function (search) {
    let ClassificacaoIndicativaJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosClassificacaoIndicativa = await DAO.selectByIdClassificacaoIndicativa(search);
        if (dadosClassificacaoIndicativa) {
            if (dadosClassificacaoIndicativa.length > 0) {
                ClassificacaoIndicativaJSON.classificacoesIndicativas = dadosClassificacaoIndicativa;
                ClassificacaoIndicativaJSON.status_code = 200;
                return ClassificacaoIndicativaJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
module.exports = {
    setInserirNovaClassificacaoIndicativa,
    setAtualizarClassificacaoIndicativa,
    getListarClassificoesIndicativas,
    getBuscarClassificacaoIndicativaId
}