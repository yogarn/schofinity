const { sendError } = require('../services/responseHandler');
const scholarshipServices = require('../services/scholarship');
const scheduleServices = require('../services/mentorSchedule');
const onlineClassServices = require('../services/onlineClass');
const mentoringServices = require('../services/mentoring');
const favoriteServices = require('../services/favorite');
const userServices = require('../services/user');
const mentorServices = require('../services/mentor');

function checkRoleId(requiredRoleId) {
    return async function (req, res, next) {
        const userId = req.jwt.id;
        const { roleId } = await userServices.findByUserId(userId);

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
    const { roleId } = await userServices.findByUserId(req.jwt.id);

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
    const mentor = await mentorServices.findByUserId(req.jwt.id);
    const { roleId } = await userServices.findByUserId(req.jwt.id);

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

async function checkMentoringOwnership(req, res, next) {
    const mentoringId = req.params.id;
    const mentoring = await mentoringServices.find(mentoringId);
    const mentor = await mentorServices.findByUserId(req.jwt.id);
    const { roleId } = await userServices.findByUserId(req.jwt.id);

    if (!mentoring) {
        sendError(res, "Mentoring not found");
    } else {
        if (roleId === 3 || (mentor && mentor.id === mentoring.mentorId) || req.jwt.id === mentoring.userId) {
            next();
        } else {
            sendError(res, "Insufficient privilege");
        }
    }
}

async function checkClassOwnership(req, res, next) {
    const classId = req.params.classId;
    const onlineClass = await onlineClassServices.find(classId);
    const mentor = await mentorServices.findByUserId(req.jwt.id);
    const { roleId } = await userServices.findByUserId(req.jwt.id);

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

async function checkClassPayment(req, res, next) {
    const classId = req.params.classId;
    const userId = req.jwt.id;
    const { roleId } = await userServices.findByUserId(userId);

    const mentor = await mentorServices.findByUserId(userId);
    const onlineClass = await onlineClassServices.find(classId);
    const payment = await onlineClassServices.checkPayment(userId, classId);

    if (!onlineClass) {
        sendError(res, "Class not found");
    } else {
        if (roleId === 3 || payment || (mentor && mentor.id === onlineClass.mentorId)) {
            next();
        } else {
            sendError(res, "Payment not found");
        }
    }

}

async function checkFavoriteOwnership(req, res, next) {
    const favoriteId = req.params.id;
    const userId = req.jwt.id;
    const { roleId } = await userServices.findByUserId(userId);

    const favorite = await favoriteServices.find(favoriteId);

    if (!favorite) {
        sendError(res, "Favorite not found");
    } else {
        if (roleId === 3 || (favorite.userId === userId)) {
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
    checkMentoringOwnership,
    checkClassOwnership,
    checkClassPayment,
    checkFavoriteOwnership
};
