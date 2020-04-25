// https://medium.com/@diomalta/migrations-e-seeders-no-sequelizejs-67ba3571ed0e
const User = sequelize.define('User', { 
    /* .... */ 
  }, {
    // não adicionar os atributos (updatedAt, createdAt)
    timestamps: false,
  
    // não permite deletar do banco, mas inseri na coluna deletedAt a data da exclusão
    // se o timestamps estiver ativado
    paranoid: true,
  
    // não adiciona camelcase para atributos gerados automaticamente
    // então se definirmos updatedAt ele será criado como updated_at
    underscored: true,
  
    // para evitar que o sequelize defina suas tabelas com o nome em plural automaticamente
    // como permanencia para permanencium ative a opção como true
    freezeTableName: true,
  
    // definindo o nome da sua tabela
    tableName: 'user_project'
  });

  //Example Seed
  // module.exports = {
  //   up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', 
  //     [
  //       {
  //         fullName: 'John Doe',
  //         email: 'test@medium.com',
  //         password: '9ff7b641722c30acdc058f2499d97dd8',
  //       },
  //       {
  //         fullName: 'John Travolta',
  //         email: 'test2@medium.com',
  //         password: '082b66a712e3efe31385f3158e057496',
  //       }
  //     ], {}),
  
  //   down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
  // };