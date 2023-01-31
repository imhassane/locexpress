const constants = require("../../constants");
const { db } = require('../../startup/db');
const { formatToDbProperty, returnData, formatProperty } = require("../../utils");

/**
 * Fonction qui créé une propriété
 */
exports.createProperty = async data => {
    const validationErrors = {};
    let {
        location, type, category, format,
        dimension, nbBedrooms, nbToilets,
        user
    } = data;

    location = location?.trim();

    if (!Object.values(constants.PROPERTY_TYPES).includes(type)) validationErrors.type = 'Le type est incorrect';
    if (!Object.values(constants.PROPERTY_FORMAT).includes(format)) validationErrors.format = 'Le format est incorrect';
    if (!Object.values(constants.PROPERTY_CATEGORIES).includes(category)) validationErrors.category = 'La catégorie est incorrecte';
    if (dimension <= 0) validationErrors.dimension = 'La dimension est incorrecte';
    if (nbBedrooms && nbBedrooms < 0) validationErrors.nbBedrooms = 'Le nombre de chambre est incorrect';
    if (nbToilets && nbToilets < 0) validationErrors.nbToilets = 'Le nombre de toilettes est incorrect';
    if (!user) validationErrors.user = 'L\'utilisateur n\'est pas reconnu';

    if (Object.values(validationErrors)?.length) return returnErrors(validationErrors);

    const [property] = await db(constants.tables.PROPERTIES)
                                .insert({
                                    ...formatToDbProperty(data),
                                    created_at: new Date(),
                                    updated_at: new Date()
                                })
                                .returning('*');
    return returnData(formatProperty(property));
};

exports.updateProperty = async (id, data) => {

};

exports.deleteProperty = async id => {

};

exports.getProperty = async id => {

}
