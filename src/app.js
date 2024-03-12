require('dotenv').config();
require('./config/nodecron');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const routes = require('./routes/index');
app.use('/v1', routes);

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

server.setTimeout(10000);
