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
        const apagarFilmeGenero = `DELETE FROM filme_Genero WHERE id_genero = ${search}`
        const apagarGenero = `DELETE FROM Generos WHERE id = ${search}`;
        let resultApagarFilmeGenero = await prisma.$executeRawUnsafe(apagarFilmeGenero)
        let resultApagarGenero = await prisma.$executeRawUnsafe(apagarGenero)
        if (resultApagarGenero) {
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
const selectByIdFilme = async function (search) {
    try {
        const sql = `SELECT filme_genero.id AS id_conexao,Generos.id,Generos.nome FROM Generos JOIN filme_genero ON Generos.id = filme_genero.id_genero WHERE id_filme = ${search}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result
    } catch (error) {
        return false
    }
}
const deleteGeneroFilme = async function (dadosBody) {
    try {
        const sql = ` DELETE From filme_genero WHERE filme_genero.id_filme = ${dadosBody.idFilme} AND filme_genero.id_genero = ${dadosBody.idGenero}`;
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
const insertGeneroFilme = async function(dados){
    try {
        const sql = ` INSERT INTO filme_genero(id_filme,id_genero)VALUES(${dados.idFilme},${dados.idGenero})`;
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

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    pegarUltimoId,
    selectAllGeneros,
    selectByIdGenero,
    selectByIdFilme,
    deleteGeneroFilme,
    insertGeneroFilme,
}