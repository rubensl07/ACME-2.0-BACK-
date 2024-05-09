const message = require('../config.js')
const DAO = require('../model/DAO/sexos.js')

const setInserirNovoSexo = async function (dadosSexo, contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let novoSexoJSON = {}
    if (dadosSexo.nome == ''|| dadosSexo.nome == undefined|| dadosSexo.nome == null||dadosSexo.nome.length > 20 ||
        dadosSexo.sigla == ''|| dadosSexo.sigla == undefined|| dadosSexo.sigla == null||dadosSexo.sigla.length > 1
) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novoSexo = await DAO.insertSexo(dadosSexo)
            let id = await DAO.pegarUltimoId()
            if(novoSexo && id) {
                novoSexoJSON.sexo = dadosSexo
                novoSexoJSON.status = message.SUCCESS_CREATED_ITEM.status
                novoSexoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoSexoJSON.message = message.SUCCESS_CREATED_ITEM.message
                novoSexoJSON.id = 'ID adicionado: '+id[0].id
                return novoSexoJSON //201
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

const setAtualizarSexo = async function (id, dadosSexo, contentType) {
    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novoSexoJSON = {}
            if (dadosSexo.nome == ''|| dadosSexo.nome == undefined|| dadosSexo.nome == null||dadosSexo.nome.length > 20 ||
            dadosSexo.sigla == ''|| dadosSexo.sigla == undefined|| dadosSexo.sigla == null||dadosSexo.sigla.length > 1
    ) {
                       return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novoSexo = await DAO.updateSexo(id, dadosSexo)
                    if(novoSexo) {
                        novoSexoJSON.sexo = dadosSexo
                        novoSexoJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
                        novoSexoJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
                        novoSexoJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
                        novoSexoJSON.id = 'ID editado: '+id
                        return novoSexoJSON //201
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

const setExcluirSexo = async function (id) {
    let excluirSexoJSON={}
    let sexoExcluido = await DAO.deleteSexo(id)
    if(sexoExcluido){
        excluirSexoJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
        excluirSexoJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
        excluirSexoJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
        return excluirSexoJSON //202
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}


const getListarSexos = async function () {
    let sexosJSON = {};
    let dadosSexos = await DAO.selectAllSexos();
        if (dadosSexos) {
        if(dadosSexos.length > 0) {
            sexosJSON.sexos = dadosSexos;
            sexosJSON.quantidade = dadosSexos.length;
            sexosJSON.status_code = 200;
            return sexosJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}
const getBuscarSexoId = async function (search) {
    let sexoJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosSexo = await DAO.selectByIdSexo(search);
        if (dadosSexo) {
            if (dadosSexo.length > 0) {
                sexoJSON.sexo = dadosSexo;
                sexoJSON.status_code = 200;
                return sexoJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}

module.exports = {
    setInserirNovoSexo,
    setAtualizarSexo,
    setExcluirSexo,
    getListarSexos,
    getBuscarSexoId
}