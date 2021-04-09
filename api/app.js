const express = require('express');

const app = express();

require('./startup/globalMiddleware')(app);
require('./startup/routes')(app);

module.exports = app;
