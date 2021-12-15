'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('servicos', {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        descricao: {
          type: Sequelize.STRING,
          allowNull: false
        },
        valor: {
          type: Sequelize.DOUBLE,
          allowNull: false
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

    return queryInterface.dropTable('servicos')
  }
};
