'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('prestadores', 
    [
        {
          nome: 'João da Silva',
          email:"JoaoSilva@gmail.com",
          cpfOuCnpj:"12345678902",
          telefone: "21985524444",
          observacao:"Mais de 20 anos de experiência."
        },
        {
          nome: 'José Rodrigues de Carneiro',
          email:"Joserodriguescarneiro@gmail.com",
          cpfOuCnpj:"12345678111",
          telefone: "21974123526",
          observacao:"Mais de 10 anos de experiência."
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('prestadores');
  }
};
