const { logger } = require("../startup/logger");
const { returnError } = require("../utils");

module.exports =  fn => async (req, res, _next) => {
    try {
        return await fn(req, res);
    } catch(ex) {
        logger.error(ex.message);
        let code = 500;
        let message = 'Une erreur s\'est produite';

        if (ex.code === 'SQLITE_CONSTRAINT') {
            code = 400;
            message = 'Cette donnée existe déjà';
        }
        return res.status(code).json(returnError(message));
    }
};