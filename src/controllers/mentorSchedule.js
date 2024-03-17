const mentorServices = require('../services/mentor');
const { create, findAll, update, destroy } = require('../services/mentorSchedule');
const { sendResponse, sendError } = require('../services/responseHandler');
const { clearEndpoints } = require('../services/cache');

async function addSchedule(req, res, next) {
    try {
        const { day, startTime, endTime } = req.body;
        const scheduleDetails = { day, startTime, endTime };
        const mentor = await mentorServices.findByUserId(req.jwt.userId);

        if (!mentor) {
            throw new Error("Insufficient privilege");
        }

        scheduleDetails.mentorId = mentor.id;

        const schedule = await create(scheduleDetails);
        sendResponse(res, schedule);
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
        const { day, startTime, endTime } = req.body;
        const updateDetails = { day, startTime, endTime };

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
