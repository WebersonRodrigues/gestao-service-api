const usuarioService = require('../services/usuarioService');
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros');
const UsuarioDTO = require('../dtos/UsuarioDTO');

class UsuarioController {
    async login(req, res){
        const {email, senha} = req.body;

        try {

            if(!email || !senha){
                throw new NaoAutorizadoErro(401, 'Usuário ou senha inválidos')
            }

            let credencial = await usuarioService.validarUsuario(email, senha);
            return res.json(credencial);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

    async logout(req, res){
        try {
           await usuarioService.logout(req.headers.authorization);
        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    async obterPorId(req, res){
        const { id } = req.params;

        try {
            if(!id){
                throw new ModeloInvalidoErro(400, "O Id é obrigatório para obter o usuário")
            }

            let usuario = await usuarioService.obterPorId(id);
            return res.json(usuario);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    async cadastrar(req, res){
        try {
            let usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.modeloValidoCadastro();

            let usuarioCadastrado = await usuarioService.cadastrar(usuarioDTO);
            return res.json(usuarioCadastrado);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }

    async atualizar(req, res){
        const { id } = req.params;

        try {

            if(!id){
                throw new ModeloInvalidoErro(400, "O Id é obrigatório para atualizar o usuário")
            }

            let usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.id = parseInt(id);
            usuarioDTO.modeloValidoAtualizacao();

            let usuarioAtualizado = await usuarioService.atualizar(usuarioDTO);
            return res.json(usuarioAtualizado);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }
    }
}

module.exports = UsuarioController;