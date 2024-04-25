const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertNacionalidade = async function (dadosNacionalidade) {
    try {
            let sql = `insert into Nacionalidades (pais) values ('${dadosNacionalidade.pais}');`
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
const updateNacionalidade = async function (id, dadosNacionalidade) {
    try{
    let sql = `UPDATE Nacionalidades SET pais = '${dadosNacionalidade.pais}' WHERE id = ${id}`
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



async function pegarUltimoId() {
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Nacionalidades LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}
const selectAllNacionalidades = async function () {
    try {
        const sql = `select * from Nacionalidades`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        return false
    }
}
const selectByIdNacionalidade = async function (search) {
    try {
        const sql = `SELECT * FROM Nacionalidades WHERE id = ${search}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result
    } catch (error) {
        return false
    }
}


module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    pegarUltimoId,
    selectAllNacionalidades,
    selectByIdNacionalidade,
}