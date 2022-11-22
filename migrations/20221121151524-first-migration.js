"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userrides", { id: Sequelize.INTEGER });
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userrides");
    /**
     * Add reverting commands here.
     *
     * Example:
     *
     */
  },
};
