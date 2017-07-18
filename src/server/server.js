var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var api = require('./api');

var app = express();
var port = process.env.PORT || 3001;

//db config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kovaja:qeTaSr2j3mk@ds159892.mlab.com:59892/kovaja-shopping-list');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader(‘Access-Control-Allow-Origin’, '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
            'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(express.static('build'));    
if (process.env.NODE_ENV === 'production') {
    
}
app.use('/api', api);

app.listen(port, function () {
    console.log('Api is running on port ' + port);
});
