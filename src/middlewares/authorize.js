const { sendError } = require('../services/responseHandler');
const scholarshipServices = require('../services/scholarship');
const scheduleServices = require('../services/mentorSchedule');
const onlineClassServices = require('../services/onlineClass');

const { getRoleByUserId } = require('../services/user');
const { findByUserId } = require('../services/mentor');

function checkRoleId(requiredRoleId) {
    return async function (req, res, next) {
        const userId = req.jwt.id;
        const { roleId } = await getRoleByUserId(userId);

        if (requiredRoleId.includes(roleId)) {
            next();
        } else {
            sendError(res, "Insufficient privilege");
        }
    }
}

async function checkScholarshipOwnership(req, res, next) {
    const scholarshipId = req.params.id;
    const scholarship = await scholarshipServices.find(scholarshipId);
    const { roleId } = await getRoleByUserId(req.jwt.id);

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

async function checkScheduleOwnership(req, res, next) {
    const scheduleId = req.params.id;
    const schedule = await scheduleServices.find(scheduleId);
    const mentor = await findByUserId(req.jwt.id);
    const { roleId } = await getRoleByUserId(req.jwt.id);

    if (!schedule) {
        sendError(res, "Schedule not found");
    } else {
        if (roleId === 3 || (mentor && mentor.id === schedule.mentorId)) {
            next();
        } else {
            sendError(res, "Insufficient privilege");
        }
    }
}

async function checkClassOwnership(req, res, next) {
    const classId = req.params.classId;
    const onlineClass = await onlineClassServices.find(classId);
    const mentor = await findByUserId(req.jwt.id);
    const { roleId } = await getRoleByUserId(req.jwt.id);

    if (!onlineClass) {
        sendError(res, "Class not found");
    } else {
        if (roleId === 3 || (mentor && mentor.id === onlineClass.mentorId)) {
            next();
        } else {
            sendError(res, "Insufficient privilege");
        }
    }
}

module.exports = {
    checkRoleId,
    checkScholarshipOwnership,
    checkScheduleOwnership,
    checkClassOwnership
};
