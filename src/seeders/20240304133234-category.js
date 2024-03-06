'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'unggulan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'prestasi akademik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'prestasi non-akademik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'mahasiswa kurang mampu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'mahasiswa difabel',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'putra/putri daerah',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
