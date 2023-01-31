const tables = require('./tables');
const routes = require('./routes');

module.exports = {
    tables,
    routes,

    STATES: {
        UNAVAILABLE: 0,
        AVAILABLE: 1,
        DELETED: 2
    },

    USER_ROLES: {
        SELLER: 0,
        ADMINISTRATOR: 1,
        SUPERUSER: 2
    },

    PROPERTY_TYPES: {
        RESIDENCE: 0,
        BUREAU: 1,
        RESTAURANT: 2,
        ENTREPOT: 3,
        PARCELLE: 4,
        LOGEMENT: 5
    },

    PROPERTY_CATEGORIES: {
        IMMEUBLE: 0,
        VILLA: 1,
        DUPLEX: 2,
        REZ_DE_CHAUSSEE: 3
    },

    PROPERTY_FORMAT: {
        HABITATION: 0,
        COLOCATION: 1
    }
};