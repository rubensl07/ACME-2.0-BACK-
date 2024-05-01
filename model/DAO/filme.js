const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var coringa = "|"

const insertFilme = async function (dadosFilme) {
    let sql
    try {
        if (dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ) {

            sql = `insert into Filmes(
                        nome,
                        sinopse,
                        duracao,
                        data_lancamento,
                        data_relancamento,
                        foto_capa,
                        foto_fundo,
                        cor,
                        id_classificacao_indicativa
                    ) values (
  REPLACE ('${dadosFilme.nome}',"'","${coringa}"),
  REPLACE ("${dadosFilme.sinopse}","'","${coringa}"),
  '${dadosFilme.duracao}',
  '${dadosFilme.data_lancamento}',
  '${dadosFilme.data_relancamento}',
  '${dadosFilme.foto_capa}',
  '${dadosFilme.foto_fundo}',
  '${dadosFilme.cor}',
  '${dadosFilme.classificacao}
  );`

        } else {
            sql = `insert into Filmes (nome,
                   sinopse,
                   duracao,
                   data_lancamento,
                   data_relancamento,
                   foto_capa,
                   foto_fundo,
                   cor,
                   id_classificacao_indicativa
) values (
    REPLACE ('${dadosFilme.nome}',"'","${coringa}"),
    REPLACE ("${dadosFilme.sinopse}","'","${coringa}"),
'${dadosFilme.duracao}',
'${dadosFilme.data_lancamento}',
null,
'${dadosFilme.foto_capa}',
'${dadosFilme.foto_fundo}',
'${dadosFilme.cor}',
'${dadosFilme.classificacao}'
);`
        }
        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(inser, update, delete)]
        //$queryRawUnsafe() - serve para executar scripts sem retorno de dados (select)
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
const deleteFilme = async function (search) {
    try {
        const apagarFavorito = ` DELETE FROM Favoritos WHERE id_filme = ${search}`;
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

const updateFilme = async function (id, dadosFilme) {
    let sql
    try{
        if (dadosFilme.data_relancamento != '' &&
        dadosFilme.data_relancamento != null &&
        dadosFilme.data_relancamento != undefined
    ) {
            sql = `UPDATE Filmes SET 
            nome = "${dadosFilme.nome}",
            sinopse = "${dadosFilme.sinopse}",
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = '${dadosFilme.data_relancamento}',
            foto_capa = '${dadosFilme.foto_capa}',
            foto_fundo = '${dadosFilme.foto_fundo}',
            cor =  '${dadosFilme.cor}',
            id_classificacao_indicativa = '${dadosFilme.classificacao}'
            WHERE id = ${id}`
    } else {
        sql = `UPDATE Filmes SET 
        nome = "${dadosFilme.nome}",
        sinopse = "${dadosFilme.sinopse}",
        duracao = '${dadosFilme.duracao}',
        data_lancamento = '${dadosFilme.data_lancamento}',
        foto_capa = '${dadosFilme.foto_capa}',
        foto_fundo = '${dadosFilme.foto_fundo}',
        cor =  '${dadosFilme.cor}',
        id_classificacao_indicativa = '${dadosFilme.classificacao}'
        WHERE id = ${id}`
    }
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
    const sql = `SELECT cast(last_insert_id() AS DECIMAL) AS id FROM Filmes LIMIT 1;`
    let pegarId = await prisma.$queryRawUnsafe(sql)
    return pegarId
}


const selectAllFilmes = async function () {
    try {
        const sql = `select * from Filmes`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes;
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllFilmesSort = async function (sort) {
    try {
        const sql = `select * from Filmes ORDER BY ${sort}`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes;
    } catch (error) {
        return false
    }
}


const selectByIdFilme = async function (search) {
    try {
        const sql = `SELECT * From Filmes WHERE id = ${search}`;
        // const sql = `SELECT * FROM Filmes WHERE id = ${search}`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectPesquisarFilmes = async function (search) {
    try {
        const sql = `SELECT * FROM Filmes WHERE nome LIKE '%${search}%' OR sinopse LIKE '%${search}%'`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
    } catch (error) {
        return false
    }
}
const selectFilterFilmes = async function (sql) {
    try{
        return rsFilmes = await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }

}

module.exports = {
 insertFilme,
 deleteFilme,
 updateFilme,
 pegarUltimoId,
 selectAllFilmes,
 selectByIdFilme,
 selectPesquisarFilmes,
 selectFilterFilmes,
 selectAllFilmesSort,
}