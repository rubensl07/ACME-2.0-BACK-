/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL. 
 *      Aqui realizamos o CRUD utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Rubens Luiz Lobo de Almeida
 * Versão: 1.0
 * 
 *******************************************************************************/

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function pegarUltimoId() {
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Sexos LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}
const insertUsuario = async function (dadosUsuario) {
    try {
        let sql = `INSERT INTO Usuarios (
                nome,
                nascimento,
                foto_usuario,
                login,
                senha,
                id_sexo
            ) VALUES (
                "${dadosUsuario.nome}",
                "${dadosUsuario.nascimento}",
                '${dadosUsuario.foto_usuario}',
                '${dadosUsuario.login}',
                '${dadosUsuario.senha}',
                ${dadosUsuario.id_sexo}
            );`

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
const deleteUsuario = async function (search) {
    try {
        const sql = `DELETE FROM Usuarios WHERE id = ${search}`;
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

const updateUsuario = async function (id, dadosUsuario) {
    try{

        let sql = `UPDATE Usuarios SET 
            nome = "${dadosUsuario.nome}",
            nascimento = "${dadosUsuario.nascimento}",
            foto_usuario = '${dadosUsuario.foto_usuario}',
            login = '${dadosUsuario.login}',
            senha = '${dadosUsuario.senha}',
            id_sexo = ${dadosUsuario.id_sexo},
            admin = ${dadosUsuario.admin}
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

const selectAllUsuarios = async function (){
    try {
        const sql = `select * from Usuarios`;
        let rsUsuarios = await prisma.$queryRawUnsafe(sql);
        return rsUsuarios;
    } catch (error) {
        return false
    }
}
const selectByIdUsuario = async function (search) {
    try {
        const sql = `select * from Usuarios WHERE id = ${search}`;
        let rsUsuarios = await prisma.$queryRawUnsafe(sql);
        return rsUsuarios
    } catch (error) {
        return false
    }
}

module.exports = {
    pegarUltimoId,
    selectAllUsuarios,
    selectByIdUsuario,
    insertUsuario,
    deleteUsuario,
    updateUsuario
}