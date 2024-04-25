const message = require('../config.js')
const DAO = require('../model/DAO/atores.js')

const setInserirnovoAtor = async function (dadosAtor, contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let novoAtorJSON = {}
    if (dadosAtor.nome == ''|| dadosAtor.nome == undefined|| dadosAtor.nome == null||dadosAtor.nome.length > 100 ||
        dadosAtor.nascimento == ''|| dadosAtor.nascimento == undefined|| dadosAtor.nascimento == null||dadosAtor.nascimento.length > 10 ||
        dadosAtor.foto == ''|| dadosAtor.foto == undefined|| dadosAtor.foto == null||dadosAtor.foto.length > 200 ||
        dadosAtor.id_sexo == ''|| dadosAtor.id_sexo == undefined|| dadosAtor.id_sexo == null||dadosAtor.id_sexo.length > 1
) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novoAtor = await DAO.insertAtor(dadosAtor)
            let id = await DAO.pegarUltimoId()
            if(novoAtor && id) {
                novoAtorJSON.ator = dadosAtor
                novoAtorJSON.status = message.SUCESS_CREATED_ITEM.status
                novoAtorJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                novoAtorJSON.message = message.SUCESS_CREATED_ITEM.message
                novoAtorJSON.id = 'ID adicionado: '+id[0].id
                return novoAtorJSON //201
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

const setAtualizarAtor = async function (id, dadosAtor, contentType) {
    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novoAtorJSON = {}
            if (dadosAtor.nome == ''|| dadosAtor.nome == undefined|| dadosAtor.nome == null||dadosAtor.nome.length > 100 ||
            dadosAtor.nascimento == ''|| dadosAtor.nascimento == undefined|| dadosAtor.nascimento == null||dadosAtor.nascimento.length > 10 ||
            dadosAtor.foto == ''|| dadosAtor.foto == undefined|| dadosAtor.foto == null||dadosAtor.foto.length > 200 ||
            dadosAtor.id_sexo == ''|| dadosAtor.id_sexo == undefined|| dadosAtor.id_sexo == null||dadosAtor.id_sexo.length > 1
    ) {
                       return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novoAtor = await DAO.updateAtor(id, dadosAtor)
                    if(novoAtor) {
                        novoAtorJSON.ator = dadosAtor
                        novoAtorJSON.status = message.SUCESS_ACCEPTED_ITEM.status
                        novoAtorJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
                        novoAtorJSON.message = message.SUCESS_ACCEPTED_ITEM.message
                        novoAtorJSON.id = 'ID editado: '+id
                        return novoAtorJSON //201
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
const getListarAtores = async function () {
    let atoresJSON = {};
    let dadosAtores = await DAO.selectAllAtores();
        if (dadosAtores) {
        if(dadosAtores.length > 0) {
            atoresJSON.classificoesIndicativas = dadosAtores;
            atoresJSON.quantidade = dadosAtores.length;
            atoresJSON.status_code = 200;
            return atoresJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}
const getBuscarAtorId = async function (search) {
    let atorJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosAtor = await DAO.selectByIdAtor(search);
        if (dadosAtor) {
            if (dadosAtor.length > 0) {
                atorJSON.ator = dadosAtor;
                atorJSON.status_code = 200;
                return atorJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}

module.exports = {
    setInserirnovoAtor,
    setAtualizarAtor,
    getListarAtores,
    getBuscarAtorId
}