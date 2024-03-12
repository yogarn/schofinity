const { findByUserId } = require('../services/mentor');
const { create, findAll, update } = require('../services/mentorSchedule');
const { sendResponse, sendError } = require('../services/responseHandler');

async function addSchedule(req, res) {
    try {
        const scheduleDetails = req.body;
        const mentor = await findByUserId(req.jwt.id);

        if (!mentor) {
            throw new Error("Insufficient privilege");
        }

        scheduleDetails.mentorId = mentor.id;

        await create(scheduleDetails);
        sendResponse(res, scheduleDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllSchedule(req, res, next) {
    try {
        const schedules = await findAll();
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
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addSchedule,
    getAllSchedule,
    updateSchedule
}
