'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios', 
    [
        {
          nome: 'Administrador',
          email:"administradorservice@gmail.com",
          senha: "b075703a9b30ddc015c6592c76520562",
          idPerfil: 1,
          dataInativacao: null
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios');
  }
};
