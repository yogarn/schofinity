const mentorServices = require('../services/mentor');
const { create, findAll, update, destroy } = require('../services/mentorSchedule');
const { sendResponse, sendError } = require('../services/responseHandler');
const { clearEndpoints } = require('../services/cache');

async function addSchedule(req, res, next) {
    try {
        const scheduleDetails = req.body;
        const mentor = await mentorServices.findByUserId(req.jwt.id);

        if (!mentor) {
            throw new Error("Insufficient privilege");
        }

        scheduleDetails.mentorId = mentor.id;

        await create(scheduleDetails);
        sendResponse(res, scheduleDetails);
        clearEndpoints(['/v1/mentors']);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllSchedule(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        const schedules = await findAll(whereClause, order, limit, offset);
        sendResponse(res, schedules);
        res.locals.data = schedules;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateSchedule(req, res, next) {
    try {
        const scheduleId = req.params.id;
        const updateDetails = req.body;

        await update(scheduleId, updateDetails);
        sendResponse(res, updateDetails);
        clearEndpoints(['/v1/mentors']);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteSchedule(req, res, next) {
    try {
        const scheduleId = req.params.id;

        await destroy(scheduleId);
        sendResponse(res, { scheduleId });
        clearEndpoints(['/v1/mentors']);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addSchedule,
    getAllSchedule,
    updateSchedule,
    deleteSchedule
}
