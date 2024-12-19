'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING(50)
      },
      tempatlahir: {
        type: Sequelize.STRING(50)
      },
      tanggallahir: {
        type: Sequelize.DATE
      },
      jeniskelamin: {
        type: Sequelize.ENUM('L', 'P'),
        allowNull: false,
      },
      
      alamat: {
        type: Sequelize.STRING(100)
      },
      namaorangtua: {
        type: Sequelize.STRING(50)
      },
      nohp: {
        type: Sequelize.STRING(12)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('siswas');
  }
};