const NodeCache = require('node-cache');
const sendResponse = require('./responseHandler');
const cache = new NodeCache({ stdTTL: 5 * 60 });

function getUrlFromRequest(req, res, next) {
    const url = req.protocol + '://' + req.headers.host + req.originalUrl;
    return url;
}

function set(req, res, next) {
    const url = getUrlFromRequest(req);
    cache.set(url, res.locals.data);
}

function get(req, res, next) {
    const url = getUrlFromRequest(req);
    const content = cache.get(url);
    if (content) {
        sendResponse(res, 200, content);
    } else {
        next();
    }
}

module.exports = {
    set,
    get
}