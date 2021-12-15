const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Perfil = require('../models/Perfil');
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const Endereco = require('../models/Endereco');
const Status = require('../models/Status');
const Prestador = require('../models/Prestador');
const Servico = require('../models/Servico');
const Orcamento = require('../models/Orcamento');
const OrcamentoItem = require('../models/OrcamentoItem');

Perfil.init(connection);
Usuario.init(connection);
Cliente.init(connection);
Endereco.init(connection);
Status.init(connection);
Prestador.init(connection);
Servico.init(connection);
Orcamento.init(connection);
OrcamentoItem.init(connection);

module.exports = connection;