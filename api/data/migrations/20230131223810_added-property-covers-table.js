const constants = require('../../constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable(constants.tables.PROPERTIES_COVERS).then(exists => {
        if (!exists) {
            return knex.schema.createTable(constants.tables.PROPERTIES_COVERS, table => {
                table.increments('cov_id').primary();
                table.text('cov_url').notNullable();
                table.string('status').defaultTo(constants.STATES.UNAVAILABLE).notNullable();
                table.timestamps();
            });
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists(constants.tables.PROPERTIES_COVERS);
};
