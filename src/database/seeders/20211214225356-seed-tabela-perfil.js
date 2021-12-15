'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('perfis', 
      [
          {
            descricao: 'ADMIN'
          },
          {
            descricao: 'MANAGER'
          },
          {
            descricao: 'STANDARD'
          }
      ]);
   
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('perfis');
  }
};
