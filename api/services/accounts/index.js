const bcrypt = require('bcrypt');
const constants = require("../../constants");
const { returnErrors, returnData, returnError, formatUser } = require("../../utils");
const { db, Users } = require("../../startup/db");

/**
 * Fonction qui créé un utilisateur
 * @param data Contient les informations (nom complet, numéro de téléphone, mot de passe et rôle) de l'utilisateur
 * @returns Object
 */
exports.createUser = async (data) => {
    const validationErrors = {};
    let { fullname, phone, password, role = constants.USER_ROLES.SELLER } = data;

    fullname = fullname?.trim();
    phone = phone?.trim();
    password = password?.trim();

    if (!fullname || fullname?.length < 2) validationErrors.fullname = 'Le nom complet est trop court';
    if (!phone || phone?.length < 9 || !(/^([\+]?)[0-9]{9,15}$/.test(phone))) validationErrors.phone = 'Le numéro de téléphone est incorrect';
    if (!password || password?.length < 8) validationErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    if (!Object.values(constants.USER_ROLES)?.includes(role)) validationErrors.role = 'Le rôle attribué à l\'utilisateur est inconnu';

    if (Object.values(validationErrors)?.length) return returnErrors(validationErrors);

    const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUND) || 10);
    const hash = bcrypt.hashSync(password, salt);
    const [user] = await db(constants.tables.USERS)
                    .insert({
                        usr_fullname: fullname,
                        usr_phone: phone,
                        usr_hash: hash,
                        usr_role: role,
                        status: constants.STATES.UNAVAILABLE,
                        created_at: new Date(),
                        updated_at: new Date()
                    })
                    .returning('*');
    return returnData(formatUser(user));
};

/**
 * Fonction qui authentifie un utilisateur
 * @param data Contient les informations (numéro de téléphone, mot de passe) de l'utilisateur
 * @returns Object
 */
exports.authenticate = async data => {
    const validationErrors = {};
    let { phone, password } = data;

    phone = phone?.trim();
    password = password?.trim();

    if (!phone || phone?.length < 9 || !(/^([\+]?)[0-9]{9,15}$/.test(phone))) validationErrors.phone = 'Le numéro de téléphone est incorrect';
    if (!password || password?.length < 8) validationErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';

    if (Object.values(validationErrors)?.length) return returnErrors(validationErrors);

    const [user] = await Users().select('*').where('usr_phone', phone);
    if (!user) return returnError('Le numéro de téléphone est inconnu');
    if (!bcrypt.compareSync(password, user.usr_hash)) return returnError('Le mot de passe est incorrect');

    return returnData(formatUser(user));
};

/**
 * Fonction qui renvoie un utilisateur
 * @param Number id Identifiant de l'utilisateur
 * @returns Object
 */
exports.getUser = async id => {
    if (!id) return returnError('L\'identifiant est nul');

    const [user] = await Users().select('*').where('usr_id', id);
    if(!user) return returnError('L\'utilisateur est inconnu');

    return returnData(formatUser(user));
}
