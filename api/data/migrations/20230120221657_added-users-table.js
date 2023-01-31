const constants = require('../../constants');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable(constants.tables.USERS).then(exists => {
        if (!exists) {
            return knex.schema.createTable(constants.tables.USERS, table => {
                table.increments('usr_id').primary();
                table.string('usr_phone', 15).unique().notNullable();
                table.string('usr_fullname', 50).notNullable();
                table.text('usr_hash').notNullable();
                table.tinyint('usr_role').notNullable().defaultTo(constants.USER_ROLES.SELLER);
                table.tinyint('status').notNullable().defaultTo(constants.STATES.UNAVAILABLE);
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
    return knex.schema.dropTableIfExists(constants.tables.USERS);
};
