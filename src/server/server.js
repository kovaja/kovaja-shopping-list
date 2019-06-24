const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Api = require('./api');

const PORT = process.env.PORT || 8000;
const BUILD_PATH = path.join(__dirname, '../../public/');

//db config
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://app:d32e32dwqd32d@ds159892.mlab.com:59892/kovaja-shopping-list')
.then(() => console.log('Database connected'))
.catch(e => console.log('Database connection error\n', e));

const bodyParserJson = bodyParser.json();
const app = express();
const router = Api.initalizeRouter(express);

app.use(express.static(BUILD_PATH));
app.use(bodyParserJson);
app.use('/api', router);
app.listen(PORT, () => console.debug('Lift-stat server listening on ' + PORT));