const { create, findAll, find, update, findByUserId, destroy } = require('../services/mentor');
const { sendResponse, sendError } = require('../services/responseHandler');
const userServices = require('../services/user');

async function addMentor(req, res) {
    try {
        const mentorDetails = req.body;
        mentorDetails.userId = req.jwt.id;
        await create(mentorDetails);
        sendResponse(res, mentorDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllMentors(req, res, next) {
    try {
        const mentors = await findAll();
        sendResponse(res, mentors);
        res.locals.data = mentors;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getMentorById(req, res, next) {
    try {
        const mentorId = req.params.id;
        const mentors = await find(mentorId);
        sendResponse(res, mentors);
        res.locals.data = mentors;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function acceptMentor(req, res, next) {
    try {
        const mentorId = req.params.id;
        const mentor = await find(mentorId);

        await update(mentor.id, { statusId: 2 });
        await userServices.update(mentor.userId, { roleId: 2 });
        sendResponse(res, mentor);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function updateMentor(req, res, next) {
    try {
        const updateDetails = req.body;
        const userId = req.jwt.id;
        const mentor = await findByUserId(userId);

        await update(mentor.id, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteMentor(req, res, next) {
    try {
        const mentorId = req.params.id;
        const mentor = await find(mentorId);

        await destroy(mentorId)
        await userServices.update(mentor.userId, { roleId: 1 });
        sendResponse(res, mentor);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addMentor,
    getAllMentors,
    getMentorById,
    acceptMentor,
    updateMentor,
    deleteMentor
}
