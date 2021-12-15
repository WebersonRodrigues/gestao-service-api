'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('prestadores', {
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
          allowNull: true
        },
        telefone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        cpfOuCnpj: {
          type: Sequelize.STRING,
          allowNull: true
        },
        observacao: {
          type: Sequelize.TEXT,
          allowNull: true
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

    return queryInterface.dropTable('prestadores')
  }
};
