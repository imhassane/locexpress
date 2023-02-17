const constants = require("../constants");

const formatStatus = code => {
    let status;
    switch (code) {
        case constants.STATES.AVAILABLE:
            status = 'AVAILABLE';
            break;
        case constants.STATES.DELETED:
            status = 'DELETED';
            break;
        case constants.STATES.UNAVAILABLE:
            status = 'UNAVAILABLE';
            break;
        default:
            status = 'UNDEFINED';
            break;
    }
    return status;
}

exports.returnData = data => ({ data })

exports.returnError = error => ({ error })

exports.returnErrors = errors => ({ errors })

exports.formatUser = user => ({
    id: user?.usr_id,
    phone: user?.usr_phone,
    fullname: user?.usr_fullname,
    createdAt: user?.created_at,
    updatedAt: user?.updated_at
});

exports.formatToDbProperty = property => {
    const data = {}, keys = {};

    Object.keys(property || {})
        .forEach(key => {
            keys[key] = true;
        });

    if (keys.id) data.pro_id = property.id;
    if (keys.location) data.pro_location = property.location;
    if (keys.type) data.pro_type = property.type;
    if (keys.category) data.pro_category = property.category;
    if (keys.format) data.pro_format = property.format;
    if (keys.dimension) data.pro_dimension = property.dimension;
    if (keys.nbBbedrooms) data.pro_nb_bedrooms = property.nbBedrooms;
    if (keys.nbToilets) data.pro_nb_toilets = property.nbToilets;
    if (keys.hasKitchen) data.pro_has_kitchen = property.hasKitchen;
    if (keys.hasDiningRoom) data.pro_has_dining_room = property.hasDiningRoom;
    if (keys.hasBalcony) data.pro_has_balcony = property.hasBalcony;
    if (keys.hasGarage) data.pro_has_garage = property.hasGarage;
    if (keys.hasPool) data.pro_has_pool = property.hasPool;
    if (keys.hasAirConditioning) data.pro_has_air_conditioning = property.hasAirConditioning;
    if (keys.hasFurniture) data.pro_has_furniture = property.hasFurniture;
    if (keys.hasIncludedCharges) data.pro_has_included_charges = property.hasIncludedCharges;
    if (keys.hasGarden) data.pro_has_garden = property.hasGarden;
    if (keys.hasCleaningService) data.pro_has_cleaning_service = property.hasCleaningService;
    if (keys.hasSecurity) data.pro_has_security = property.hasSecurity;
    if (keys.hasLaundry) data.pro_has_laundry = property.hasLaundry;
    if (keys.user) data.usr_id = property.user?.id || property.user;
    if (keys.cover) data.pro_cover = property.cover?.id;
    if (keys.status) data.status = constants.STATES[property.status];
    if (keys.createdAt) data.created_at = property.createdAt;
    if (keys.updatedAt) data.updated_at = property.updatedAt;

    return data;
};

exports.formatProperty = property => {
    const data = { user: {}, cover: {} }, keys = {};

    Object.keys(property || {})
        .forEach(key => {
            keys[key] = true;
        });

    if (keys.pro_id) data.id = property.pro_id;
    if (keys.pro_location) data.location = property.pro_location;
    if (keys.pro_type) data.type = property.pro_type;
    if (keys.pro_category) data.category = property.pro_category;
    if (keys.pro_format) data.format = property.pro_format;
    if (keys.pro_dimension) data.dimension = property.pro_dimension;
    if (keys.pro_nb_bedrooms) data.nbBedrooms = property.pro_nb_bedrooms;
    if (keys.pro_nb_toilets) data.nbToilets = property.pro_nb_toilets;
    if (keys.pro_has_kitchen) data.hasKitchen = !!property.pro_has_kitchen;
    if (keys.pro_has_dining_room) data.hasDiningRoom = !!property.pro_has_dining_room;
    if (keys.pro_has_balcony) data.hasBalcony = !!property.pro_has_balcony;
    if (keys.pro_has_garage) data.hasGarage = !!property.pro_has_garage;
    if (keys.pro_has_pool) data.hasPool = !!property.pro_has_pool;
    if (keys.pro_has_air_conditioning) data.hasAirConditioning = !!property.pro_has_air_conditioning;
    if (keys.pro_has_furniture) data.hasFurniture = !!property.pro_has_furniture;
    if (keys.pro_has_included_charges) data.hasIncludedCharges = !!property.pro_has_included_charges;
    if (keys.pro_has_garden) data.hasGarden = !!property.pro_has_garden;
    if (keys.pro_has_cleaning_service) data.hasCleaningService = !!property.pro_has_cleaning_service;
    if (keys.pro_has_security) data.hasSecurity = !!property.pro_has_security;
    if (keys.pro_has_laundry) data.hasLaundry = !!property.pro_has_laundry;
    if (keys.usr_id) data.user.id = property.usr_id;
    if (keys.pro_cover) data.cover.id = property.pro_cover;
    if (keys.status) data.status = formatStatus(property.status);
    if (keys.created_at) data.createdAt = new Date(property.created_at);
    if (keys.updated_at) data.updatedAt = new Date(property.updated_at);

    if (!keys.pro_cover) delete data.cover;
    if (!keys.user) delete data.user;

    return data;
};

exports.formatStatus = formatStatus;
