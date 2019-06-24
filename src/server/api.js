const methodsDefinitons = require('./methodsDefinitions');

const isValidPostMethod = (method) => {
    return method && method.method && method.params;
};

const isValidGetMethod = (method) => {
    return method && method.method
}

const sendNotFound = (res, url) => {
    const body = {
        result: 1,
        message: 'UNKNOWN URL ' + url
    };

    res.status(404).json(body);
};

const sendBadRequest = (res) => {
    const body = {
        result: 1,
        message: 'MALICIOUS REQUEST PARAMS'
    };

    res.status(400).json(body);
};

const getParams = (req, method) => {}

const initalizeRouter = (express) => {
    const router = express.Router();

    router.post('*', (req, res) => {
        const method = methodsDefinitons[req.url];

        if (!isValidPostMethod(method)) {
            sendNotFound(res, req.url);
            return;
        }

        var params = {};

        method.params.forEach((key) => {
            if (req.body.hasOwnProperty(key)) {
                params[key] = req.body[key];
            }
        });

        if (Object.keys(params).length !== method.params.length) {
            sendBadRequest(res);
            return;
        }

        method.method(params)
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

    router.get('*', function (req, res) {
        const method = methodsDefinitons[req.url];

        if (!isValidGetMethod(method)) {
            sendNotFound(res, req.url);
            return;
        }

        method.method()
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

  return router;
};

module.exports = {
  initalizeRouter: initalizeRouter
};