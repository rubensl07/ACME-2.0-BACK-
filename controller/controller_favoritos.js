/********************************************************************************
 * Objetivo: Arquivo responsável pelas validações e consistências de dados de Usuario
 * Data: 01/02/2024
 * Autor: Rubens Luiz Lobo de Almeida
 * Versão: 1.0
 * 
 *******************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../config.js')

const DAO = require('../model/DAO/favoritos.js')

const getListarFavoritos = async function () {
    let favoritosJSON = {};
    let dadosFavoritos = await DAO.selectAllFavoritos();
    if (dadosFavoritos) {
        if (dadosFavoritos.length > 0) {
            favoritosJSON.Favoritos = dadosFavoritos;
            favoritosJSON.quantidade = dadosFavoritos.length;
            favoritosJSON.status_code = 200;
            return favoritosJSON;
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getFavoritoId = async function (id) {
    let favoritoJSON = {};
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosFavorito = await DAO.selectFavoritoId(id);
        if (dadosFavorito) {
            if (dadosFavorito.length > 0) {
                favoritoJSON.favorito = dadosFavorito;
                favoritoJSON.status_code = 200;
                return favoritoJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
const getFavoritosUsuario = async function (usuarioId) {
    let favoritosJSON = {};
    if (usuarioId == '' || usuarioId == undefined || isNaN(usuarioId)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosFavoritos = await DAO.selectFavoritosUsuario(usuarioId);
        if (dadosFavoritos) {
            if (dadosFavoritos.length > 0) {
                favoritosJSON.favoritos = dadosFavoritos;
                favoritosJSON.status_code = 200;
                return favoritosJSON;
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }
}
const setInserirNovoFavorito = async function (dadosFavorito, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novoFavoritoJSON = {}
            if (dadosFavorito.idUsuario == '' || dadosFavorito.idUsuario == undefined || dadosFavorito.idUsuario == null ||
                dadosFavorito.idFilme == '' || dadosFavorito.idFilme == undefined || dadosFavorito.idFilme == null 
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                    let novoFavorito = await DAO.insertFavorito(dadosFavorito)
                    let id = await DAO.pegarUltimoId()
                    if (novoFavorito) {
                        novoFavoritoJSON.usuario = dadosFavorito
                        novoFavoritoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novoFavoritoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoFavoritoJSON.message = message.SUCCESS_CREATED_ITEM.message
                        novoFavoritoJSON.id = 'ID adicionado: '+id[0].id

                        return novoFavoritoJSON //201
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

const setExcluirFavorito = async function (dadosBody,contentType) {
    if (String(contentType).toLowerCase() == 'application/json') {
        DAO.deleteFavorito(dadosBody)
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
}


const setExcluirFavoritosUsuario = async function (idUsuario) {
    DAO.deleteFavoritosUsuario(idUsuario)
}
const setExcluirFavoritosFilme = async function (idFilme) {
    DAO.deleteFavoritosFilme(idFilme)
}

module.exports = {
    getListarFavoritos,
    getFavoritoId,
    getFavoritosUsuario,
    setInserirNovoFavorito,
    setExcluirFavorito,
    setExcluirFavoritosUsuario,
    setExcluirFavoritosFilme
}