const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Api = require('./api');

const PORT = process.env.PORT || 8000;
const BUILD_PATH = path.join(__dirname, '../../public/');

//db config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kovaja:qeTaSr2j3mk@ds159892.mlab.com:59892/kovaja-shopping-list');

const bodyParserJson = bodyParser.json();
const app = express();
const router = Api.initalizeRouter(express);

app.use(express.static(BUILD_PATH));
app.use(bodyParserJson);
app.use('/api', router);
app.listen(PORT, () => console.debug('Lift-stat server listening on ' + PORT));