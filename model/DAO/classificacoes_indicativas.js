const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertClassificacaoIndicativa = async function (dadosClassificacaoIndicativa) {
    try {
            let sql = `insert into Classificacao_indicativa (idade,icone,descricao) values ('${dadosClassificacaoIndicativa.idade}','${dadosClassificacaoIndicativa.icone}','${dadosClassificacaoIndicativa.descricao}');`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateClassificacaoIndicativa = async function (id, dadosClassificacaoIndicativa) {

    try{
    let sql = `UPDATE Classificacao_indicativa SET 
    idade = '${dadosClassificacaoIndicativa.idade}',
    icone = '${dadosClassificacaoIndicativa.icone}',
    descricao = '${dadosClassificacaoIndicativa.descricao}'
    WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if(result) {
            return true
        } else {
            return false
        }
    } catch (error){
        return false
    }

}

const deleteClassificacaoIndicativa = async function (search) {
    try {
        const transferirClassificacao = `UPDATE Filmes SET id_classificacao_indicativa = null WHERE id_classificacao_indicativa = ${search}`
        const apagarClassificacao = `DELETE FROM Classificacao_Indicativa where id = ${search}`
        let resultTransferirClassificacao = await prisma.$executeRawUnsafe(transferirClassificacao)
        let resultApagarClassificacao = await prisma.$executeRawUnsafe(apagarClassificacao)
        if (resultApagarClassificacao) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}



async function pegarUltimoId() {
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Classificacao_indicativa LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}
const selectAllClassificacoesIndicativas = async function () {
    try {
        const sql = `select * from Classificacao_indicativa`;
        let rsClassificacoesIndicativas = await prisma.$queryRawUnsafe(sql);
        return rsClassificacoesIndicativas;
    } catch (error) {
        return false
    }
}
const selectByIdClassificacaoIndicativa = async function (search) {
    try {
        const sql = `SELECT * FROM Classificacao_indicativa WHERE id = ${search}`;
        let rsClassificacoesIndicativas = await prisma.$queryRawUnsafe(sql);
        return rsClassificacoesIndicativas
    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacaoIndicativa,
    updateClassificacaoIndicativa,
    deleteClassificacaoIndicativa,
    pegarUltimoId,
    selectAllClassificacoesIndicativas,
    selectByIdClassificacaoIndicativa,
}