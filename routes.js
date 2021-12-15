const express = require('express');
const routes = express.Router();
const usuarioService = require('./src/services/usuarioService');

const UsuarioController = require('./src/controllers/UsuarioController');
const ClienteController = require('./src/controllers/ClienteController');
const ServicoController = require('./src/controllers/ServicoController');
const PrestadorController = require('./src/controllers/PrestadorController');
const OrcamentoController = require('./src/controllers/OrcamentoController');

const usuarioController = new UsuarioController();
const clienteController = new ClienteController();
const servicoController = new ServicoController();
const prestadorController = new PrestadorController();
const orcamentoController = new OrcamentoController();

// Esse cara é um interceptor, ele intercepta todas as rotas e aqui podemos tomar qualquer ação antes de bater na rota especifica.
routes.use(async (req, res, next) =>{

    const { authorization } = req.headers;
    let autenticado = await usuarioService.validarAutenticacao(authorization);
    
    if(!autenticado && req.originalUrl !== '/login' && process.env.AUTENTICACAO != 'FALSE'){
        return res.status(401).json({
            status: 401,
            message:'Usuário não autenticado',
            name: 'NaoAutorizado'
        });
    }

    next();
 
});


// Rotas do usuário
routes.post("/login", usuarioController.login);
routes.delete('/logout', usuarioController.logout);

routes.get("/usuarios/:id", usuarioController.obterPorId);
routes.post("/usuarios", usuarioController.cadastrar);
routes.put("/usuarios/:id", usuarioController.atualizar);

// Rotas de cliente
routes.get('/clientes', clienteController.obterTodos);
routes.get('/clientes/:id', clienteController.obterPorId);
routes.post('/clientes', clienteController.cadastrar);
routes.put('/clientes/:id', clienteController.atualizar);

// Rotas de servico
routes.get('/servicos', servicoController.obterTodos);
routes.get('/servicos/:id', servicoController.obterPorId);
routes.post('/servicos', servicoController.cadastrar);
routes.put('/servicos/:id', servicoController.atualizar);

// Rotas de prestador
routes.get('/prestadores', prestadorController.obterTodos);
routes.get('/prestadores/:id', prestadorController.obterPorId);
routes.post('/prestadores', prestadorController.cadastrar);
routes.put('/prestadores/:id', prestadorController.atualizar);

// Rotas de orcamento 
routes.post('/orcamentos', orcamentoController.cadastrar);
routes.get('/orcamentos', orcamentoController.obterTodos);
routes.get('/orcamentos/:id', orcamentoController.obterPorId);
routes.put('/orcamentos/:id', orcamentoController.atualizar);

module.exports = routes;

