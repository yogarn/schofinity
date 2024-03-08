const { sendError } = require('../services/responseHandler');
const { getRole } = require('../services/user');

function authorizeUser(requiredRoleId) {
    return async function (req, res, next) {
        const userId = req.jwt.id;
        const { roleId } = await getRole(userId);

        if (requiredRoleId.includes(roleId)) {
            next();
        } else {
            sendError(res, "Insufficient privilege");
        }
    }
}

module.exports = authorizeUser;
