const express = require('express')
const router = require('./routing/index')
const app = express();
const bodyParser = require('body-parser');



app.use('/', router);
app.use(bodyParser.json())

module.exports = app;