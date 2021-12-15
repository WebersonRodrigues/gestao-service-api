const Cliente = require('../models/Cliente');
const Endereco = require('../models/Endereco');
const ClienteDTO = require('../dtos/ClienteDTO');
const EnderecoDTO = require('../dtos/EnderecoDTO');
const { NaoAutorizadoErro, NaoEncontratoErro, AplicacaoErro } = require('../erros/typeErros');


async function obterPorId(id){
    let cliente = await Cliente.findByPk(id);

    if(!cliente){
        throw new NaoEncontratoErro(404, 'Não foi possível encontrar um cliente com id ' + id);
    }

    cliente = new ClienteDTO(cliente);

    let enderecos = await Endereco.findAll({ where: { idCliente: id }});

    cliente.enderecos = enderecos.map(e => new EnderecoDTO(e));
    return cliente;
}

async function obterTodos(){
    let clientes = await Cliente.findAll();
    return clientes && clientes.map(c => new ClienteDTO(c)) || [];
}

async function cadastrar(clienteDTO){
    let cliente = await Cliente.create(clienteDTO);

    if(!cliente){
        throw new AplicacaoErro(500, 'Não foi possível cadastrar o cliente.');
    }

    let enderecos = [];

    for(var endereco of clienteDTO.enderecos){
        endereco.idCliente = parseInt(cliente.id);
        let novoEndereco = await Endereco.create(endereco);

        enderecos.push(new EnderecoDTO(novoEndereco));
    }

    cliente = new ClienteDTO(cliente);
    cliente.enderecos = enderecos;

    return cliente;
}

async function atualizar(clienteDTO){

    let cliente = await Cliente.findByPk(clienteDTO.id);

    if(!cliente){
        throw new NaoEncontratoErro(404, 'Não foi possível encontrar um cliente com o id ' + clienteDTO.id);
    }

    let atualizado = await Cliente.update(clienteDTO, { where : { id: clienteDTO.id }});

    if(!atualizado){
        throw new AplicacaoErro(500, 'Não foi possível atualizar o cliente.');
    }

    for(var endereco of clienteDTO.enderecos){
        await Endereco.update(endereco, { where: { id: endereco.id }});
    }

    return clienteDTO;
}

module.exports = {
    cadastrar,
    atualizar,
    obterPorId,
    obterTodos
}