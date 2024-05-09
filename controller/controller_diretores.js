const message = require('../config.js')
const DAO = require('../model/DAO/diretores.js')
const sexosDAO = require('../model/DAO/sexos.js')
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')


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
                novoDiretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoDiretorJSON.message = message.SUCCESS_CREATED_ITEM.message
                novoDiretorJSON.id = id[0].id
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
                        novoDiretorJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
                        novoDiretorJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
                        novoDiretorJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
                        novoDiretorJSON.id = id
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
const setExcluirDiretor = async function (id) {
    let excluirDiretorJSON={}
    let DiretorExcluido = await DAO.deleteDiretor(id)
    if(DiretorExcluido){
        excluirDiretorJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
        excluirDiretorJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
        excluirDiretorJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
        return excluirDiretorJSON //202
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}
const getListarDiretores = async function () {
    let dadosDiretores = await DAO.selectAllDiretores();
    const dadosSexos = await sexosDAO.selectAllSexos();
    
    let diretoresJSON = {};
        if (dadosDiretores) {
        if(dadosDiretores.length > 0) {
            for (let index = 0; index < dadosDiretores.length; index++) {
                const diretor = dadosDiretores[index];
                const dadosNacionalidadesDiretor = await nacionalidadesDAO.selectAllNacionalidadesDiretor(diretor.id)
                let nacionalidade = []
                dadosNacionalidadesDiretor.forEach(nacionalidadeDiretor => {
                    const nacionalidadeJSON = {
                        id: nacionalidadeDiretor.id,
                        pais: nacionalidadeDiretor.pais
                    } 
                    nacionalidade.push(nacionalidadeJSON)
                });
                diretor.nacionalidade = nacionalidade
                const idSexo = diretor.id_sexo

                let sexoJSON = {}
                dadosSexos.forEach(sexo => {
                    if(idSexo==sexo.id){
                        sexoJSON = sexo
                    }
                })
                diretor.sexo = sexoJSON
                delete diretor.id_sexo
            }
            diretoresJSON.diretores = dadosDiretores;
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

const getListarDiretoresSort = async function (sort) {
    let dadosDiretores = await DAO.selectAllDiretoresSort(sort);
    const dadosSexos = await sexosDAO.selectAllSexos();

    let diretoresJSON = {};

        if (dadosDiretores) {
        if(dadosDiretores.length > 0) {
            for (let index = 0; index < dadosDiretores.length; index++) {
                const diretor = dadosDiretores[index]
                const idSexo = diretor.id_sexo

                let sexoJSON = {}
                dadosSexos.forEach(sexo => {
                    if(idSexo==sexo.id){
                        sexoJSON = sexo
                    }
                })
                diretor.sexo = sexoJSON
                delete diretor.id_sexo

            }
            diretoresJSON.diretores = dadosDiretores;
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
    let dadosDiretor = await DAO.selectByIdDiretor(search);
    const dadosSexos = await sexosDAO.selectAllSexos();

    let diretorJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        if (dadosDiretor) {
            if (dadosDiretor.length > 0) {
                    const diretor = dadosDiretor[0];
                    const dadosNacionalidadesDiretor = await nacionalidadesDAO.selectAllNacionalidadesDiretor(diretor.id)
                    let nacionalidade = []
                    dadosNacionalidadesDiretor.forEach(nacionalidadeDiretor => {
                        const nacionalidadeJSON = {
                            id: nacionalidadeDiretor.id,
                            pais: nacionalidadeDiretor.pais
                        } 
                        nacionalidade.push(nacionalidadeJSON)
                    });
                    diretor.nacionalidade = nacionalidade
                    const idSexo = diretor.id_sexo
    
                    let sexoJSON = {}
                    dadosSexos.forEach(sexo => {
                        if(idSexo==sexo.id){
                            sexoJSON = sexo
                        }
                    })
                    diretor.sexo = sexoJSON
                    delete diretor.id_sexo
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

const getExibirDiretoresFilme = async function(search){
    let diretoresJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosDiretores = await DAO.selectByIdFilme(search);
        if (dadosDiretores) {
            if (dadosDiretores.length > 0) {
                diretoresJSON.diretores = dadosDiretores;
                diretoresJSON.status_code = 200;
                return diretoresJSON;
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
    setExcluirDiretor,
    getListarDiretores,
    getListarDiretoresSort,
    getBuscarDiretorId,
    getExibirDiretoresFilme
}