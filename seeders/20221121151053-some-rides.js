"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rides",
      [
        {
          pickuplat: 52.37909,
          pickuplong: 4.88622,
          droplat: 52.37017,
          droplong: 4.8826,
          amount: 2,
          startTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          pickuplat: 52.36,
          pickuplong: 4.88622,
          droplat: 52.38895,
          droplong: 4.83741,
          amount: 3,
          startTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          pickuplat: 52.247682941966055,
          pickuplong: 4.8336753207389975,
          droplat: 52.38895,
          droplong: 4.83741,
          amount: 2,
          startTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          pickuplat: 52.36,
          pickuplong: 4.88622,
          droplat: 52.2430645821191,
          droplong: 4.821667853263688,
          amount: 1,
          startTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rides", null, {});
  },
};
