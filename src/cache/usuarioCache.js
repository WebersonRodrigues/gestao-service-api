const usuariosLogados = [];
const { NaoAutorizadoErro } = require('../erros/typeErros');

function adicionarNoCache(credencial){

    if(!credencial || 
       !credencial.usuario || 
       !credencial.token || 
       !credencial.dataExpiracao){
        throw new NaoAutorizadoErro();
    }

    usuariosLogados.push(credencial);
}

function removerNoCache(token){
    let indice = usuariosLogados.findIndex(credencial => credencial.token == token);

    if(!isNaN(indice)){
        usuariosLogados.splice(indice, 1);
    }
}

function obterCredencial(usuario){
    let credencial = usuariosLogados.find(c => c.usuario.id == usuario.id);
    return credencial;
}

function obterCredencialPorToken(token){
    let credencial = usuariosLogados.find(c => c.token == token);
    return credencial;
}

function atualizarDataExpiracao(token, dataExpiracao){
    let indice = usuariosLogados.findIndex(c => c.token == token);

    if(!isNaN(indice)){
        usuariosLogados[indice].dataExpiracao = dataExpiracao;
    }
}

module.exports ={
    adicionarNoCache,
    removerNoCache,
    obterCredencial,
    obterCredencialPorToken,
    atualizarDataExpiracao
}