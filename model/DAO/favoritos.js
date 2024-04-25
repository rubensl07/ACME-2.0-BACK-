/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL. 
 *      Aqui realizamos o CRUD utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Rubens Luiz Lobo de Almeida
 * Versão: 1.0
 * 
 *******************************************************************************/

const { PrismaClient } = require('@prisma/client');

var coringa = "|"
//Instância da classe prisma client
const prisma = new PrismaClient();

async function pegarUltimoId() {
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Favoritos LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}
const selectAllFavoritos = async function (){
    try {
        const sql = `select * from Favoritos`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result

    } catch (error) {
        return false
    } 
}
const selectFavoritoId = async function (id) {
    try {
        const sql = `SELECT * FROM Favoritos WHERE Favoritos.id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        console.log(sql);
        return result
    } catch (error) {
        return false
    }
}
const selectFavoritosUsuario = async function (idUsuario) {
    try {
        const sql = `SELECT id, id_filme FROM Favoritos WHERE Favoritos.id_usuario = ${idUsuario}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result

    } catch (error) {
        return false
    }
}
const insertFavorito = async function (dadosFavorito) {
    let sql
    try {
            sql = `INSERT INTO Favoritos (
                id_usuario,
                id_filme
            ) VALUES (
                "${dadosFavorito.idUsuario}",
                "${dadosFavorito.idFilme}"
            )`
            
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
const deleteFavorito = async function (dadosBody) {
    try {
        const sql = `DELETE FROM Favoritos WHERE id_usuario = ${dadosBody.idUsuario} AND id_filme = ${dadosBody.idFilme}`;
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
const deleteFavoritosUsuario = async function (idUsuario) {
    try {
        const sql = `DELETE FROM Favoritos WHERE id_usuario = ${idUsuario}`;
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
const deleteFavoritosFilme = async function (idFilme) {
    try {
        const sql = `DELETE FROM Favoritos WHERE id_filme = ${idFilme}`;
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
    pegarUltimoId,
    selectAllFavoritos,
    selectFavoritoId,
    selectFavoritosUsuario,
    insertFavorito,
    deleteFavorito,
    deleteFavoritosUsuario,
    deleteFavoritosFilme
}