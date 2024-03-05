require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const routes = require('./routes/index');
app.use('/v1', routes);

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

server.setTimeout(10000);
