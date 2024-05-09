const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var caractereSubstituidoOld = "'"
var caractereSubstituidoNew = "|"
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
  REPLACE ("${dadosFilme.nome}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
  REPLACE ("${dadosFilme.sinopse}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
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
    REPLACE ("${dadosFilme.nome}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
    REPLACE ("${dadosFilme.sinopse}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
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
        const apagarDiretorFilme = `DELETE from diretor_filme where id_filme = ${search}`;
        const apagarAtorFilme = `DELETE from ator_filme where id_filme = ${search}`;
        const apagarGenerosFilme = `DELETE from filme_genero where id_filme = ${search}`;
        const apagarFavoritos = `DELETE from Favoritos WHERE id_filme = ${search}`
        const apagarFilme = `DELETE FROM Filmes WHERE id = ${search}`;

        const resultApagarDiretores = await prisma.$executeRawUnsafe(apagarDiretorFilme)
        const resultApagarAtores = await prisma.$executeRawUnsafe(apagarAtorFilme)
        const resultApagarGeneros = await prisma.$executeRawUnsafe(apagarGenerosFilme)
        const resultApagarFavoritos = await prisma.$executeRawUnsafe(apagarFavoritos)
        const resultApagarFilme = await prisma.$executeRawUnsafe(apagarFilme)

        if (resultApagarFilme) {
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
            nome = replace("${dadosFilme.nome}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
            sinopse = replace("${dadosFilme.sinopse}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
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
        nome = replace("${dadosFilme.nome}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
        sinopse = replace("${dadosFilme.sinopse}","${caractereSubstituidoOld}","${caractereSubstituidoNew}"),
        duracao = '${dadosFilme.duracao}',
        data_lancamento = '${dadosFilme.data_lancamento}',
        foto_capa = '${dadosFilme.foto_capa}',
        foto_fundo = '${dadosFilme.foto_fundo}',
        cor =  '${dadosFilme.cor}',
        id_classificacao_indicativa = '${dadosFilme.classificacao}'
        WHERE id = ${id}`
    }
    console.log(sql);
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
        const sql = `SELECT id, replace(nome,"${caractereSubstituidoNew}","'") as nome,replace(sinopse,"${caractereSubstituidoNew}","'") as sinopse, duracao, data_lancamento, data_relancamento, foto_capa, foto_fundo,cor,id_classificacao_indicativa FROM Filmes`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes;
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllFilmesSort = async function (sort) {
    try {
        const sql = `SELECT id, replace(nome,"${caractereSubstituidoNew}","'") as nome,replace(sinopse,"${caractereSubstituidoNew}","'") as sinopse, duracao, data_lancamento, data_relancamento, foto_capa, foto_fundo,cor,id_classificacao_indicativa FROM Filmes ORDER BY ${sort}`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes;
    } catch (error) {
        return false
    }
}


const selectByIdFilme = async function (search) {
    try {
        const sql = `SELECT id, replace(nome,"${caractereSubstituidoNew}","'") as nome,replace(sinopse,"${caractereSubstituidoNew}","'") as sinopse, duracao, data_lancamento, data_relancamento, foto_capa, foto_fundo,cor,id_classificacao_indicativa FROM Filmes WHERE id = ${search}`;
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectPesquisarFilmes = async function (search) {
    try {
        const sql = `SELECT filmes.id, filmes.nome, filmes.foto_capa, filmes.cor, filmes.sinopse 
        FROM filmes 
        LEFT JOIN ator_filme ON filmes.id = ator_filme.id_filme 
        LEFT JOIN atores ON ator_filme.id_ator = atores.id 
        LEFT JOIN diretor_filme ON filmes.id = diretor_filme.id_filme 
        LEFT JOIN diretores ON diretor_filme.id_diretor = diretores.id 
        WHERE filmes.nome LIKE '%${search}%' 
           OR filmes.sinopse LIKE '%${search}%' 
           OR atores.nome LIKE '%${search}%' 
           OR diretores.nome LIKE '%${search}%' 
        GROUP BY filmes.id, filmes.nome, filmes.foto_capa, filmes.cor, filmes.sinopse;`

        console.log(sql);
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

const selectByIdDiretor = async function (search) {
    try {
        const sql = `SELECT Filmes.id,Filmes.nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,foto_fundo,cor,id_classificacao_indicativa FROM FIlmes JOIN diretor_filme ON Filmes.id = diretor_filme.id_filme WHERE DIRETOR_FILME.ID_DIRETOR = ${search}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result
    } catch (error) {
        return false
    }
}
const selectByIdAtor = async function (search) {
    try {
        const sql = `SELECT Filmes.id,Filmes.nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,foto_fundo,cor,id_classificacao_indicativa FROM FIlmes JOIN ator_filme ON Filmes.id = ator_filme.id_filme where ator_filme.id_ator = ${search}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result
    } catch (error) {
        return false
    }
}
const adicionarAtorFilme = async function(dados){
    try {
        const sql = ` INSERT INTO ator_filme(id_filme,id_ator)VALUES(${dados.idFilme},${dados.idAtor})`;
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

const removerAtorFilme = async function (dadosBody) {
    try {
        const sql = ` DELETE From ator_filme WHERE ator_filme.id_filme = ${dadosBody.idFilme} AND ator_filme.id_ator = ${dadosBody.idAtor}`;
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

const adicionarDiretorFilme = async function(dados){
    try {
        const sql = `INSERT INTO diretor_filme (id_filme, id_diretor) VALUES (${dados.idFilme}, ${dados.idDiretor})`;
        let result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};


const removerDiretorFilme = async function (dadosBody) {
    try {
        const sql = `DELETE FROM diretor_filme WHERE diretor_filme.id_filme = ${dadosBody.idFilme} AND diretor_filme.id_diretor = ${dadosBody.idDiretor}`;
        let result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};


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
 selectByIdDiretor,
 selectByIdAtor,
 adicionarAtorFilme,
 removerAtorFilme,
 adicionarDiretorFilme,
 removerDiretorFilme
}