/********************************************************************************
 * Objetivo: Arquivo responsável pelas validações e consistências de dados de Usuario
 * Data: 01/02/2024
 * Autor: Rubens Luiz Lobo de Almeida
 * Versão: 1.0
 * 
 *******************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../config.js')

const DAO = require('../model/DAO/users.js')

const getListarUsuarios = async function () {
    let usuariosJSON = {};
    let dadosUsuarios = await DAO.selectAllUsuarios();
    if (dadosUsuarios) {
        if (dadosUsuarios.length > 0) {
            usuariosJSON.usuarios = dadosUsuarios;
            usuariosJSON.quantidade = dadosUsuarios.length;
            usuariosJSON.status_code = 200;
            return usuariosJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarUsuario = async function (id) {
    let usuarioJSON = {};
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosUsuario = await DAO.selectByIdUsuario(id);
        if (dadosUsuario) {
            if (dadosUsuario.length > 0) {
                usuarioJSON.usuario = dadosUsuario;
                usuarioJSON.status_code = 200;
                return usuarioJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
const setInserirNovoUsuario = async function (dadosUsuario, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novoUsuarioJSON = {}

            if (dadosUsuario.nome == '' || dadosUsuario.nome == undefined || dadosUsuario.nome == null || dadosUsuario.nome.length > 80 ||
                dadosUsuario.nascimento == '' || dadosUsuario.nascimento == undefined || dadosUsuario.nascimento == null || dadosUsuario.nascimento.length != 10 ||
                dadosUsuario.foto_usuario == '' || dadosUsuario.foto_usuario == undefined || dadosUsuario.foto_usuario == null || dadosUsuario.foto_usuario.length > 200 ||
                dadosUsuario.login == '' || dadosUsuario.login == undefined || dadosUsuario.login == null || dadosUsuario.login.length > 50 ||
                dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha == null || dadosUsuario.senha.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    if(dadosUsuario.admin){dadosUsuario.admin = 1} else {dadosUsuario.admin=0}
                    let novoUsuario = await DAO.insertUsuario(dadosUsuario)
                    let id = await DAO.pegarUltimoId()

                    if (novoUsuario) {
                        novoUsuarioJSON.usuario = dadosUsuario
                        novoUsuarioJSON.status = message.SUCESS_CREATED_ITEM.status
                        novoUsuarioJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoUsuarioJSON.message = message.SUCESS_CREATED_ITEM.message
                        novoSexoJSON.id = 'ID adicionado: '+id[0].id

                        return novoUsuarioJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}
const setAtualizarUsuario = async function (id, dadosUsuario, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let novoUsuarioJSON = {}
            if (dadosUsuario.nome == '' || dadosUsuario.nome == undefined || dadosUsuario.nome == null || dadosUsuario.nome.length > 80 ||
                dadosUsuario.nascimento == '' || dadosUsuario.nascimento == undefined || dadosUsuario.nascimento == null || dadosUsuario.nascimento.length != 10 ||
                dadosUsuario.foto_usuario == '' || dadosUsuario.foto_usuario == undefined || dadosUsuario.foto_usuario == null || dadosUsuario.foto_usuario.length > 200 ||
                dadosUsuario.login == '' || dadosUsuario.login == undefined || dadosUsuario.login == null || dadosUsuario.login.length > 50 ||
                dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha == null || dadosUsuario.senha.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novoUsuario = await DAO.updateUsuario(id, dadosUsuario)
                    if (novoUsuario) {
                        novoUsuarioJSON.usuario = dadosUsuario
                        novoUsuarioJSON.status = message.SUCESS_CREATED_ITEM.status
                        novoUsuarioJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoUsuarioJSON.message = message.SUCESS_CREATED_ITEM.message
                        novoUsuarioJSON.id = 'ID editado: '+id

                        return novoUsuarioJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}
const setExcluirUsuario = async function (id) {
    let excluirUsuarioJSON={}
    let usuarioExcluido = await DAO.deleteUsuario(id)
    if(usuarioExcluido){
        excluirUsuarioJSON.status = message.SUCESS_ACCEPTED_ITEM.status
        excluirUsuarioJSON.status_code = message.SUCESS_ACCEPTED_ITEM.status_code
        excluirUsuarioJSON.message = message.SUCESS_ACCEPTED_ITEM.message
        return excluirUsuarioJSON //202
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

module.exports = {
    getListarUsuarios,
    getBuscarUsuario,
    setInserirNovoUsuario,
    setAtualizarUsuario,
    setExcluirUsuario
}