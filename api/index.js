const dotenv = require('dotenv');

const express = require('express');
const constants = require('./constants');

const { logger } = require('./startup/logger');

const accountRouter = require('./routes/accounts');
const propertiesRouter = require('./routes/properties');

dotenv.config();

const app = express();

app.use(express.json());

app.use(constants.routes.accounts.root, accountRouter);
app.use(constants.routes.properties.root, propertiesRouter);

const APPLICATION_PORT = process.env.APPLICATION_PORT;

app.listen(APPLICATION_PORT, () => {
    logger.info(`The API is running at port: ${APPLICATION_PORT}`)
});