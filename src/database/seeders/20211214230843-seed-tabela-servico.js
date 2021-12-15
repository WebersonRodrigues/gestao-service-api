'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('servicos', 
      [
          {
            descricao: 'Pintura interna m2',
            valor: 100,
            observacao: 'Feito com até 3 demão de tinta.'
          },
          {
            descricao: 'Pintura externa m2',
            valor: 120,
            observacao: 'Feito com até 3 demão de tinta.'
          }
      ]);
   
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('servicos');
  }
};
