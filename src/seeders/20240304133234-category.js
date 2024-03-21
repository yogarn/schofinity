'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        categoryName: 'unggulan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        categoryName: 'prestasi akademik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        categoryName: 'prestasi non-akademik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        categoryName: 'mahasiswa kurang mampu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        categoryName: 'mahasiswa difabel',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        categoryName: 'putra/putri daerah',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        categoryName: 'ekonomi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        categoryName: 'sosial',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
