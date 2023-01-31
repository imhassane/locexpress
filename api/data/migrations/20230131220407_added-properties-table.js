const constants = require('../../constants');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable(constants.tables.PROPERTIES).then(exists => {
        if (!exists) {
            return knex.schema.createTable(constants.tables.PROPERTIES, table => {
                table.increments('pro_id').primary();
                table.string('pro_location').notNullable();
                table.tinyint('pro_type').defaultTo(constants.PROPERTY_TYPES.LOGEMENT).notNullable();
                table.tinyint('pro_category').defaultTo(constants.PROPERTY_CATEGORIES.IMMEUBLE).notNullable();
                table.tinyint('pro_format').defaultTo(constants.PROPERTY_FORMAT.HABITATION).notNullable();
                table.smallint('pro_dimension').defaultTo(0).notNullable();
                table.tinyint('pro_nb_bedrooms').defaultTo(0).notNullable();
                table.tinyint('pro_nb_toilets').defaultTo(0).notNullable();
                table.boolean('pro_has_kitchen').defaultTo(false).notNullable();
                table.boolean('pro_has_dining_room').defaultTo(false).notNullable();
                table.boolean('pro_has_balcony').defaultTo(false).notNullable();
                table.boolean('pro_has_garage').defaultTo(false).notNullable();
                table.boolean('pro_has_pool').defaultTo(false).notNullable();
                table.boolean('pro_has_air_conditioning').defaultTo(false).notNullable();
                table.boolean('pro_has_furniture').defaultTo(false).notNullable();
                table.boolean('pro_has_included_charges').defaultTo(false).notNullable();
                table.boolean('pro_has_garden').defaultTo(false).notNullable();
                table.boolean('pro_has_cleaning_service').defaultTo(false).notNullable();
                table.boolean('pro_has_security').defaultTo(false).notNullable();
                table.boolean('pro_has_laundry').defaultTo(false).notNullable();
                table.integer('usr_id').unsigned().notNullable();
                table.foreign('usr_id').references(constants.tables.USERS + '.usr_id');
                table.integer('pro_cover').nullable();
                table.foreign('pro_cover').references(constants.tables.PROPERTIES_COVERS + '.cov_id');
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
    return knex.schema.dropTableIfExists(constants.tables.PROPERTIES);
};
