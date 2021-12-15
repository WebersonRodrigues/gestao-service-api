const Usuario = require('../models/Usuario');
const Perfil = require('../models/Perfil');
const { NaoAutorizadoErro, NaoEncontratoErro, AplicacaoErro } = require('../erros/typeErros');
const geradorToken = require('../utils/geradorToken');
const usuarioCache = require('../cache/usuarioCache');
const UsuarioDTO = require('../dtos/UsuarioDTO');
const PerfilDTO = require('../dtos/PerfilDTO');

async function validarUsuario(email, senha){

    email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({ where: { email }});
    
    senha = geradorToken.gerarHashDaSenha(senha);

    if(!usuario || (usuario.senha !== senha)){
        throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
    }

    let credencial = _criarCredencial(usuario);

    return credencial;
}

async function logout(token){
    usuarioCache.removerNoCache(token);
}

async function obterPorId(id){
    let usuario = await Usuario.findByPk(id);

    if(!usuario){
        throw new NaoEncontratoErro(404, "Não foi possível encontrar o usuario pelo id "+ id);
    }

    usuario.senha = undefined;
    
    let usuarioDTO = new UsuarioDTO(usuario);

    let perfil = await Perfil.findByPk(usuario.idPerfil);

    usuarioDTO.perfil = new PerfilDTO(perfil);


    return usuarioDTO;
}
async function validarAutenticacao(token){
    let credencial = usuarioCache.obterCredencialPorToken(token);

    if(!credencial || credencial.dataExpiracao < new Date()){

        if(credencial){
            usuarioCache.removerNoCache(credencial.token);
        }

        return false;
    }

    return true;
}

async function cadastrar(usuarioDTO){

    usuarioDTO.senha = geradorToken.gerarHashDaSenha(usuarioDTO.senha);

    let usuario = await Usuario.create(usuarioDTO);

    if(!usuario){
        throw new AplicacaoErro(500, 'Falha ao cadastrar o usuario');
    }

    let dto = new UsuarioDTO(usuario);
    dto.senha = undefined;
    dto.perfil = new PerfilDTO(await Perfil.findByPk(dto.idPerfil));

    return dto;
}

async function atualizar(usuarioDTO){

    let usuario = await Usuario.findByPk(usuarioDTO.id);

    if(!usuario){
        throw new NaoEncontratoErro(404, "Não foi possível encontrar o usuario pelo id "+ id);
    }
    usuarioDTO.senha = usuario.senha;

    usuario = await Usuario.update(usuarioDTO, 
        { where: { id: usuarioDTO.id }}
    );

    if(!usuario || !usuario[0]){
        throw new AplicacaoErro(500, 'Falha ao atualizar o usuario com id' + usuarioDTO.id);
    }

    usuarioDTO.senha = undefined;
    return usuarioDTO;
}

function _criarCredencial(usuario){

    let dataExpiracao = geradorToken.gerarDataExpiracao();

    let credencial = usuarioCache.obterCredencial(usuario);

    if(credencial){
        if(credencial.dataExpiracao < new Date()){
            usuarioCache.removerNoCache(credencial.token);
        }else{
            usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao);
            return credencial;
        }
    }

    let token = geradorToken.criarToken(usuario);
    usuario.senha = undefined;

    credencial = { token, usuario, dataExpiracao };
    
    usuarioCache.adicionarNoCache(credencial);

    return credencial;
}


module.exports = {
    validarUsuario,
    logout,
    obterPorId,
    validarAutenticacao,
    cadastrar,
    atualizar
}