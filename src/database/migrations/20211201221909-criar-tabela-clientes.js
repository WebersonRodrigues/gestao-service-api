'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cpfOuCnpj: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      criadoEm:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      atualizadoEm:{
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clientes')
  }
};
