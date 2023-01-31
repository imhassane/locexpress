const knex = require('knex');
const constants = require('../constants');
const configuration = require('../knexfile');

const environment = process.env.ENV || 'dev';

const dbConfig = environment === 'dev'
                    ? configuration.development
                    : environment === 'staging'
                        ? configuration.staging
                        : configuration.production;

const db = knex(dbConfig);

const Users = () => db(constants.tables.USERS);

const Properties = () => db(constants.tables.PROPERTIES);

module.exports = {
    db,
    Users,
    Properties
};
