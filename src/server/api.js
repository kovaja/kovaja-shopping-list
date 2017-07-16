var express = require('express');
var router = express.Router();

var callDefinitions = require('./callDefinitions');

router.post('/*', function (req, res) {   
    var call = callDefinitions[req.url];
    if (!call || !call.method || !call.params) {
        res.status(404).json({
            result: 1,
            message: 'UNKNOWN URL ' + req.url
        });
        return;
    }

    var params = {};
    call.params.forEach(function (key) {
        if (req.body.hasOwnProperty(key)) {
            params[key] = req.body[key];
        }
    });

    if (Object.keys(params).length !== call.params.length) {
        res.status(400).json({
            result: 1,
            message: 'MALICIOUS REQUEST PARAMS'
        });
        return;
    }

    call.method(params)
            .then(function (data) {
                res.status(200).json({
                    result: 0,
                    message: req.url,
                    data: data
                });
            })
            .catch(function (err) {
                res.status(500).json({
                    result: 1,
                    message: req.url + ' ERROR: ' + (err ? err : '')
                });
            });
});

router.get('/*', function (req, res) {
    var call = callDefinitions[req.url];
    if (!call || !call.method) {
        res.status(404).json({
            result: 1,
            message: 'UNKNOWN URL ' + req.url
        });
        return;
    }
    call.method()
            .then(function (data) {
                res.status(200).json({
                    result: 0,
                    message: req.url,
                    data: data
                });
            })
            .catch(function (err) {
                res.status(500).json({
                    result: 1,
                    message: req.url + ' ERROR: ' + (err ? err : '')
                });
            });
});

module.exports = router;
