const jwt = require('jsonwebtoken');
const sendResponse = require('./responseHandler');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return sendResponse(res, 401, 'No token provided');
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return sendResponse(res, 403, 'Invalid token');
        } else {
            req.jwt = decoded.user;
            next();
        }
    });
}

module.exports = authenticateToken;
