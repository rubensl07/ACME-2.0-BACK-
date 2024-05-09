const message = require('../config.js')
const DAO = require('../model/DAO/atores.js')
const sexosDAO = require('../model/DAO/sexos.js')
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')


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
                novoAtorJSON.status = message.SUCCESS_CREATED_ITEM.status
                novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoAtorJSON.message = message.SUCCESS_CREATED_ITEM.message
                novoAtorJSON.id = id[0].id
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
                        novoAtorJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
                        novoAtorJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
                        novoAtorJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
                        novoAtorJSON.id = id
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
const setExcluirAtor = async function (id) {
    let excluirAtorJSON={}
    let AtorExcluido = await DAO.deleteAtor(id)
    if(AtorExcluido){
        excluirAtorJSON.status = message.SUCCESS_ACCEPTED_ITEM.status
        excluirAtorJSON.status_code = message.SUCCESS_ACCEPTED_ITEM.status_code
        excluirAtorJSON.message = message.SUCCESS_ACCEPTED_ITEM.message
        return excluirAtorJSON //202
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

const getListarAtores = async function () {
    let dadosAtores = await DAO.selectAllAtores();
    const dadosSexos = await sexosDAO.selectAllSexos();
    
    let atoresJSON = {};
        if (dadosAtores) {
        if(dadosAtores.length > 0) {
            for (let index = 0; index < dadosAtores.length; index++) {
                const ator = dadosAtores[index];
                const dadosNacionalidadesAtor = await nacionalidadesDAO.selectAllNacionalidadesAtor(ator.id)
                let nacionalidade = []
                dadosNacionalidadesAtor.forEach(nacionalidadeAtor => {
                    const nacionalidadeJSON = {
                        id: nacionalidadeAtor.id,
                        pais: nacionalidadeAtor.pais
                    } 
                    nacionalidade.push(nacionalidadeJSON)
                });
                ator.nacionalidade = nacionalidade
                const idSexo = ator.id_sexo

                let sexoJSON = {}
                dadosSexos.forEach(sexo => {
                    if(idSexo==sexo.id){
                        sexoJSON = sexo
                    }
                })
                ator.sexo = sexoJSON
                delete ator.id_sexo
            }
            atoresJSON.Atores = dadosAtores;
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

const getListarAtoresSort = async function (sort) {
    let dadosAtores = await DAO.selectAllAtoresSort(sort);
    const dadosSexos = await sexosDAO.selectAllSexos();

    let atoresJSON = {};

        //Validação para verificar se existem dados de retorno
        if (dadosAtores) {
        if(dadosAtores.length > 0) {
            for (let index = 0; index < dadosAtores.length; index++) {
            let sexoJSON = {}
            dadosSexos.forEach(sexo => {
                if(dadosAtores[index].id_sexo==sexo.id){
                    sexoJSON = sexo
                }
            })
            dadosAtores[index].sexo = sexoJSON
            delete dadosAtores[index].id_sexo
        }
            //Se devolveu, cria o JSON para retornar para o app
            atoresJSON.atores = dadosAtores;
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
    let dadosAtor = await DAO.selectByIdAtor(search);
    const dadosSexos = await sexosDAO.selectAllSexos();

    let atorJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        if (dadosAtor) {
            if (dadosAtor.length > 0) {
                    const ator = dadosAtor[0];
                    const dadosNacionalidadesAtor = await nacionalidadesDAO.selectAllNacionalidadesAtor(ator.id)
                    let nacionalidade = []
                    dadosNacionalidadesAtor.forEach(nacionalidadeAtor => {
                        const nacionalidadeJSON = {
                            id: nacionalidadeAtor.id,
                            pais: nacionalidadeAtor.pais
                        } 
                        nacionalidade.push(nacionalidadeJSON)
                    });
                    ator.nacionalidade = nacionalidade
                    const idSexo = ator.id_sexo
    
                    let sexoJSON = {}
                    dadosSexos.forEach(sexo => {
                        if(idSexo==sexo.id){
                            sexoJSON = sexo
                        }
                    })
                    ator.sexo = sexoJSON
                    delete ator.id_sexo
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


const getExibirAtoresFilme = async function(search){
    let atoresJSON = {};
    if (search == '' || search == undefined || isNaN(search)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let dadosAtores = await DAO.selectByIdFilme(search);
        if (dadosAtores) {
            if (dadosAtores.length > 0) {
                atoresJSON.atores = dadosAtores;
                atoresJSON.status_code = 200;
                return atoresJSON;
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
    setExcluirAtor,
    getListarAtores,
    getListarAtoresSort,
    getBuscarAtorId,
    getExibirAtoresFilme
}