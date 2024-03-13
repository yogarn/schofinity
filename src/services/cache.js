const cache = require('../config/cache');

function clearEndpoints(endpoints) {
    try {
        const cacheKeys = cache.keys();
        const resourceKeys = cacheKeys.filter(cacheKey => {
            return endpoints.some(endpoint => cacheKey.includes(endpoint));
        });
        cache.del(resourceKeys);
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
}

module.exports = {
    clearEndpoints
};
