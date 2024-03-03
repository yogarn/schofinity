require('dotenv').config();
require('./config/sequelize')

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

server.setTimeout(2000);
