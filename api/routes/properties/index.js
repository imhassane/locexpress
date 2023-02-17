const constants = require('../../constants');
const exceptionsMiddleware = require('../../middlewares/exceptionsMiddleware');
const { createProperty, getProperties, getProperty, deleteProperty, updateProperty } = require('../../services/properties');

const router = require('express').Router();

router.post(constants.routes.properties.CREATE, exceptionsMiddleware(async (req, res) => {
    const response = await createProperty(req.body);

    if (response.errors) return res.status(400).json(response);
    return res.json(response);
}));

router.get(constants.routes.properties.GET_ALL, exceptionsMiddleware(async (req, res) => {
    const response = await getProperties();
    return res.json(response);
}));

router.get(constants.routes.properties.GET_ONE, exceptionsMiddleware(async (req, res) => {
    const response = await getProperty(req.params.id);
    return res.json(response);
}));

router.delete(constants.routes.properties.DELETE, exceptionsMiddleware(async (req, res) => {
    const response = await deleteProperty(req.params.id);
    return res.json(response);
}));

router.put(constants.routes.properties.UPDATE, exceptionsMiddleware(async (req, res) => {
    const response = await updateProperty(req.params.id, req.body.data);
    return res.json(response);
}))

module.exports = router;
