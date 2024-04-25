const message = require('../config.js')
const DAO = require('../model/DAO/diretores.js')

const setInserirNovoDiretor = async function (dadosDiretor, contentType) {
    try {
    if (String(contentType).toLowerCase() == 'application/json'){
    let novoDiretorJSON = {}
    if (dadosDiretor.nome == ''|| dadosDiretor.nome == undefined|| dadosDiretor.nome == null||dadosDiretor.nome.length > 100 ||
        dadosDiretor.nascimento == ''|| dadosDiretor.nascimento == undefined|| dadosDiretor.nascimento == null||dadosDiretor.nascimento.length > 10 ||
        dadosDiretor.foto == ''|| dadosDiretor.foto == undefined|| dadosDiretor.foto == null||dadosDiretor.foto.length > 200 ||
        dadosDiretor.id_sexo == ''|| dadosDiretor.id_sexo == undefined|| dadosDiretor.id_sexo == null||dadosDiretor.id_sexo.length > 1
) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {
            let novoDiretor = await DAO.insertDiretor(dadosDiretor)
            let id = await DAO.pegarUltimoId()
            if(novoDiretor && id) {
                novoDiretorJSON.diretor = dadosDiretor
                novoDiretorJSON.status = message.SUCESS_CREATED_ITEM.status
                novoDiretorJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                novoDiretorJSON.message = message.SUCESS_CREATED_ITEM.message
                novoDiretorJSON.id = 'ID adicionado: '+id[0].id
                return novoDiretorJSON //201
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

const setAtualizarDiretor = async function (id, dadosDiretor, contentType) {
    try{
        if(String(contentType).toLowerCase()== 'application/json'){
            let novoDiretorJSON = {}
            if (dadosDiretor.nome == ''|| dadosDiretor.nome == undefined|| dadosDiretor.nome == null||dadosDiretor.nome.length > 100 ||
            dadosDiretor.nascimento == ''|| dadosDiretor.nascimento == undefined|| dadosDiretor.nascimento == null||dadosDiretor.nascimento.length > 10 ||
            dadosDiretor.foto == ''|| dadosDiretor.foto == undefined|| dadosDiretor.foto == null||dadosDiretor.foto.length > 200 ||
            dadosDiretor.id_sexo == ''|| dadosDiretor.id_sexo == undefined|| dadosDiretor.id_sexo == null||dadosDiretor.id_sexo.length > 1
    ) {
                       return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novoDiretor = await DAO.updateDiretor(id, dadosDiretor)
                    if(novoDiretor) {
                        novoDiretorJSON.diretor = dadosDiretor
                        novoDiretorJSON.status = message.SUCESS_ACCEPTED_ITEM.status
                        novoDiretorJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
                        novoDiretorJSON.message = message.SUCESS_ACCEPTED_ITEM.message
                        novoDiretorJSON.id = 'ID editado: '+id
                        return novoDiretorJSON //201
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
const getListarDiretores = async function () {
    let diretoresJSON = {};
    let dadosDiretores = await DAO.selectAllDiretores();
        if (dadosDiretores) {
        if(dadosDiretores.length > 0) {
            diretoresJSON.classificoesIndicativas = dadosDiretores;
            diretoresJSON.quantidade = dadosDiretores.length;
            diretoresJSON.status_code = 200;
            return diretoresJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}
const getBuscarDiretorId = async function (search) {
    let diretorJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosDiretor = await DAO.selectByIdDiretor(search);
        if (dadosDiretor) {
            if (dadosDiretor.length > 0) {
                diretorJSON.diretor = dadosDiretor;
                diretorJSON.status_code = 200;
                return diretorJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}

module.exports = {
    setInserirNovoDiretor,
    setAtualizarDiretor,
    getListarDiretores,
    getBuscarDiretorId
}