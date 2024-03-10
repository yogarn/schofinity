const { sendError } = require('../services/responseHandler');
const { find } = require('../services/scholarship');
const { getRole } = require('../services/user');

function checkRoleId(requiredRoleId) {
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

async function checkScholarshipOwnership(req, res, next) {
    const scholarshipId = req.params.id;
    const scholarship = await find(scholarshipId);
    const { roleId } = await getRole(req.jwt.id);

    if (!scholarship) {
        sendError(res, "Scholarship not found");
    } else {
        if (roleId === 3 || scholarship.userId === req.jwt.id) {
            next();
        } else {
            sendError(res, "Insufficient privilege");
        }
    }
}

module.exports = {
    checkRoleId,
    checkScholarshipOwnership
};
