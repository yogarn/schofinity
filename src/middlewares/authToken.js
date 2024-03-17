const jwt = require('jsonwebtoken');
const { sendError } = require('../services/responseHandler');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return sendError(res, 'No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return sendError(res, 'Invalid jwt token');
        } else {
            req.jwt = decoded;
            next();
        }
    });
}

module.exports = authenticateToken;
