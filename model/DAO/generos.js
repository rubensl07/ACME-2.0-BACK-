const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertGenero = async function (dadosGenero) {
    try {
            let sql = `insert into Generos (nome) values ('${dadosGenero.nome}');`
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
const deleteGenero = async function (search) {
    try {
        const apagarGenero = ` DELETE FROM Favoritos WHERE id_filme = ${search}`;
        const sql = `DELETE FROM Filmes WHERE id = ${search}`;
        let resultApagarFavorito = await prisma.$executeRawUnsafe(apagarFavorito)
        let result = await prisma.$executeRawUnsafe(sql)
        if (resultApagarFavorito && result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}
const updateGenero = async function (id, dadosGenero) {

    try{
    let sql = `UPDATE Generos SET nome = '${dadosGenero.nome}' WHERE id = ${id}`
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
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Generos LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}
const selectAllGeneros = async function () {
    try {
        const sql = `select * from Generos`;
        let rsGeneros = await prisma.$queryRawUnsafe(sql);
        return rsGeneros;
    } catch (error) {
        return false
    }
}
const selectByIdGenero = async function (search) {
    try {
        const sql = `SELECT * FROM Generos WHERE id = ${search}`;
        let rsGeneros = await prisma.$queryRawUnsafe(sql);
        return rsGeneros
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    pegarUltimoId,
    selectAllGeneros,
    selectByIdGenero,
}