const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertSexo = async function (dadosSexo) {
    try {
            let sql = `insert into Sexos (nome,sigla) values ('${dadosSexo.nome}','${dadosSexo.sigla}');`
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
const updateSexo = async function (id, dadosSexo) {
    try{
    let sql = `UPDATE Sexos SET nome = '${dadosSexo.nome}', sigla = '${dadosSexo.sigla}' WHERE id = ${id}`
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
const deleteSexo = async function (search) {
    try {
        const diretores = `UPDATE Diretores SET id_sexo = null WHERE id_sexo = ${search}`
        const atores = `UPDATE Atores SET id_sexo = null WHERE id_sexo = ${search}`
        const usuarios = `UPDATE Usuarios SET id_sexo = null WHERE id_sexo = ${search}`
        const apagarSexo = `DELETE FROM Sexos WHERE id = ${search}`;
        let resultDiretores = await prisma.$executeRawUnsafe(diretores)
        let resultAtores = await prisma.$executeRawUnsafe(atores)
        let resultUsuarios = await prisma.$executeRawUnsafe(usuarios)
        let resultApagarSexo = await prisma.$executeRawUnsafe(apagarSexo)
        console.log(resultDiretores);
        console.log(resultAtores);
        console.log(resultUsuarios);
        console.log(resultApagarSexo);

        if (resultApagarSexo) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


async function pegarUltimoId() {
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Sexos LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}
const selectAllSexos = async function () {
    try {
        const sql = `select * from Sexos`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        return false
    }
}
const selectByIdSexo = async function (search) {
    try {
        const sql = `SELECT * FROM Sexos WHERE id = ${search}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    insertSexo,
    updateSexo,
    deleteSexo,
    pegarUltimoId,
    selectAllSexos,
    selectByIdSexo,
}