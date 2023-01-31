const exceptionsMiddleware = require('../../middlewares/exceptionsMiddleware');
const { createUser, authenticate, getUser } = require('../../services/accounts');

const router = require('express').Router();

router.post('/authenticate', exceptionsMiddleware(async (req, res) => {
    const response = await authenticate(req.body);

    if (response?.error) return res.status(400).json(response);
    return res.json(response)
}));

router.post('/register', exceptionsMiddleware(async (req, res) => {
    const response = await createUser(req.body);

    if (response?.errors) return res.status(400).json(response);
    return res.json(response);
}));

router.get('/user/:id/details', exceptionsMiddleware(async (req, res) => {
    const response = await getUser(req.params.id);

    if (response?.errors) return res.status(404).json(response);
    return res.json(response);
}));

module.exports = router;
