const constants = require("../../constants");
const { db, Properties } = require('../../startup/db');
const { formatToDbProperty, returnData, formatProperty, returnError } = require("../../utils");

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

/**
 * Fonction qui met à jour une propriété
 * @param {Number} id ID de la propriété à mettre à jour
 * @param {Object} data Valeurs à modifier
 * @returns Object
 */
exports.updateProperty = async (id, data) => {
    if (!id) return returnError('La propriété n\'existe pas');

    const [property] = await Properties()
                            .where('pro_id', id)
                            .whereNot('status', constants.STATES.DELETED);

    if (!property) return returnError('La propriété n\'existe pas');
    const [updatedProperty] = await Properties()
                                    .where('pro_id', id)
                                    .update({
                                        ...property,
                                        ...formatToDbProperty(data),
                                        updated_at: new Date()
                                    }, '*');

    

    return returnData(formatProperty(updatedProperty));
};

/**
 * Fonction qui supprime une propriété
 * @param {Number} id ID de la propriété à supprimer
 * @returns Property
 */
exports.deleteProperty = async id => {
    if (!id) return returnError('La propriété n\'existe pas');

    const [property] = await Properties()
                            .where('pro_id', id)
                            .update({
                                status: constants.STATES.DELETED,
                                updated_at: new Date()
                            }, '*')
    
    if (!property) return returnError('La propriété n\'existe pas');
    return returnData(formatProperty(property));
};

/**
 * Fonction qui retourne une propriété
 * @param {Number} id ID de la propriété
 * @returns 
 */
exports.getProperty = async id => {
    if (!id) return returnError('La propriété n\'existe pas');

    const [property] = await Properties()
                                .select('*')
                                .where('pro_id', id)
                                .whereNot('status', constants.STATES.DELETED);
    if (!property) return returnError('La propriété n\'existe pas');

    return returnData(formatProperty(property));
}

/**
 * Fonction qui renvoie la liste des propriétés
 * @returns Array<Property>
 */
exports.getProperties = async () => {
    const properties = await Properties().select('*').whereNot('status', constants.STATES.DELETED);
    return properties.map(formatProperty);
}