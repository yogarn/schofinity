const NodeCache = require('node-cache');
const { sendResponse } = require('../services/responseHandler');
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
        sendResponse(res, content);
    } else {
        next();
    }
}

function clear(req, res, next) {
    const cacheKeys = cache.keys();
    let resourceUrl = req.baseUrl;
    const resourceKeys = cacheKeys.filter(cacheKeys => cacheKeys.includes(resourceUrl));
    cache.del(resourceKeys);
    next();
}

function clearEndpoints(endpoints) {
    return function(req, res, next) {
        const cacheKeys = cache.keys();
        const resourceKeys = cacheKeys.filter(cacheKey => {
            return endpoints.some(endpoint => cacheKey.includes(endpoint));
        });
        cache.del(resourceKeys);
        next();
    }
}

module.exports = {
    set,
    get,
    clear,
    clearEndpoints
}