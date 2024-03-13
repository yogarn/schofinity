const mentorServices = require('../services/mentor');
const { create, findAll, update, destroy } = require('../services/mentorSchedule');
const { sendResponse, sendError } = require('../services/responseHandler');

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
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllSchedule(req, res, next) {
    try {
        const schedules = await findAll(req.query);
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
