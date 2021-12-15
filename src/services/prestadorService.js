const Prestador = require('../models/Prestador');
const PrestadorDTO = require('../dtos/PrestadorDTO');

const { NaoEncontratoErro, AplicacaoErro } = require('../erros/typeErros');
async function obterPorId(id){
    let prestador = await Prestador.findByPk(id);

    if(!prestador){
        throw new NaoEncontratoErro(404, 'Não foi possível encontrar um prestador com id ' + id);
    }

    return new PrestadorDTO(prestador);
}

async function obterTodos(){
    let prestadores = await Prestador.findAll();
    return prestadores && prestadores.map(prestador => new PrestadorDTO(prestador)) || [];
}

async function cadastrar(prestadorDTO){
    let prestador = await Prestador.create(prestadorDTO);

    if(!prestador){
        throw new AplicacaoErro(500, 'Não foi possível cadastrar o prestador.');
    }

    return new PrestadorDTO(prestador);
}

async function atualizar(prestadorDTO){

    let prestador = await Prestador.findByPk(prestadorDTO.id);

    if(!prestador){
        throw new NaoEncontratoErro(404, 'Não foi possível encontrar um prestador com o id ' + prestadorDTO.id);
    }

    let atualizado = await Prestador.update(prestadorDTO, { where : { id: prestadorDTO.id }});

    if(!atualizado){
        throw new AplicacaoErro(500, 'Não foi possível atualizar o prestador.');
    }

    return prestadorDTO;
}

module.exports = {
    obterPorId,
    obterTodos,
    cadastrar,
    atualizar
}