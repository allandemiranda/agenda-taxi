require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('trust proxy', true);

require('./controllers/motorista.controller')(app);
require('./controllers/financeiro.controller')(app);
require('./controllers/marketing.controller')(app);
require('./controllers/passageiro.controller')(app);

app.listen(5000);
