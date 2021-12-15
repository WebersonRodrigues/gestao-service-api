const prestadorService = require('../services/prestadorService');
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros');
const PrestadorDTO = require('../dtos/PrestadorDTO');

class PrestadorController {
    async obterPorId(req, res){
        const id = parseInt(req.params.id);

        try {
            if(!id || isNaN(id)){
                throw new ModeloInvalidoErro(400, 'Id inválido para consulta de serviço.');
            }

            let prestador = await prestadorService.obterPorId(id);
            return res.json(prestador);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    async obterTodos(req, res){
        try {
            let prestadores = await prestadorService.obterTodos();
            return res.json(prestadores);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    async cadastrar(req, res){
        try {
            let prestadorDTO = new PrestadorDTO(req.body);
            prestadorDTO.modeloValidoCadastro();

            let prestadorCadastrado = await prestadorService.cadastrar(prestadorDTO);
            return res.json(prestadorCadastrado);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    async atualizar(req, res){
        const { id } = req.params;

        try {

            if(!id){
                throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o prestador.")
            }

            let prestadorDTO = new PrestadorDTO(req.body);
            prestadorDTO.id = parseInt(id);
            prestadorDTO.modeloValidoAtualizacao();

            let prestadorAtualizado = await prestadorService.atualizar(prestadorDTO);
            return res.json(prestadorAtualizado);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }
}

module.exports = PrestadorController;