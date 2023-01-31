const constants = require('../../constants');
const exceptionsMiddleware = require('../../middlewares/exceptionsMiddleware');
const { createProperty } = require('../../services/properties');

const router = require('express').Router();

router.post(constants.routes.properties.CREATE, exceptionsMiddleware(async (req, res) => {
    const response = await createProperty(req.body);

    if (response.errors) return res.status(400).json(response);
    return res.json(response);
}));

module.exports = router;
