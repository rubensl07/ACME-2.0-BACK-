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

const deleteNacionalidade = async function (search) {
    try {
        const apagarDiretoresNacionalidade = `DELETE FROM diretor_Nacionalidade where id_nacionalidade = ${search}`
        const apagarAtoresNacionalidade = `DELETE FROM ator_Nacionalidade where id_nacionalidade = ${search}`
        const apagarNacionalidade = `DELETE FROM Nacionalidades where id = ${search}`;
        let resultApagarDiretor = await prisma.$executeRawUnsafe(apagarDiretoresNacionalidade)
        let resultApagarAtor = await prisma.$executeRawUnsafe(apagarAtoresNacionalidade)
        let resultApagarNacionalidade = await prisma.$executeRawUnsafe(apagarNacionalidade)
        if (resultApagarNacionalidade) {
            return true
        } else {
            return false
        }
    } catch (error) {
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
const selectAllNacionalidadesAtor = async function (idAtor) {
    try {
        const sql = `SELECT * FROM ator_nacionalidade JOIN Nacionalidades ON ator_nacionalidade.id_nacionalidade = Nacionalidades.id WHERE id_ator = ${idAtor}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        return false
    }
}
const selectAllNacionalidadesDiretor = async function (idDiretor) {
    try {
        const sql = `SELECT * FROM diretor_nacionalidade JOIN Nacionalidades ON diretor_nacionalidade.id_nacionalidade = Nacionalidades.id WHERE id_diretor = ${idDiretor}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        return false
    }
}

const insertNacionalidadeAtor = async function(dados){
    try {
        const sql = `INSERT INTO ator_nacionalidade(id_ator,id_nacionalidade)VALUES(${dados.idAtor},${dados.idNacionalidade})`;
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
const deleteNacionalidadeAtor = async function (dadosBody) {
    try {
        const sql = ` DELETE From ator_nacionalidade WHERE ator_nacionalidade.id_ator = ${dadosBody.idAtor} AND ator_nacionalidade.id_nacionalidade = ${dadosBody.idNacionalidade}`;
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
const insertNacionalidadeDiretor = async function(dados){
    try {
        const sql = `INSERT INTO diretor_nacionalidade(id_diretor,id_nacionalidade)VALUES(${dados.idDiretor},${dados.idNacionalidade})`;
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
const deleteNacionalidadeDiretor = async function (dadosBody) {
    try {
        const sql = `DELETE From diretor_nacionalidade WHERE diretor_nacionalidade.id_diretor = ${dadosBody.idDiretor} AND diretor_nacionalidade.id_nacionalidade = ${dadosBody.idNacionalidade}`;
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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    pegarUltimoId,
    selectAllNacionalidades,
    selectByIdNacionalidade,
    selectAllNacionalidadesAtor,
    selectAllNacionalidadesDiretor,
    insertNacionalidadeAtor,
    deleteNacionalidadeAtor,
    insertNacionalidadeDiretor,
    deleteNacionalidadeDiretor,
}