const { create, update, findAll, find, checkPayment } = require('../services/mentoring');
const mentorServices = require('../services/mentor');
const userServices = require('../services/user');
const { sendResponse, sendError } = require('../services/responseHandler');
const { v4: uuidv4 } = require('uuid');

async function addMentoring(req, res, next) {
    try {
        let { mentorId, startDate, endDate } = req.body;
        const mentoringDetails = {};
        const uuid = uuidv4();
        const orderId = `mentoring ${uuid}`;
        const userId = req.jwt.userId;

        const mentor = await mentorServices.find(mentorId);
        const user = await userServices.findByUserId(userId);

        mentoringDetails.id = uuid;
        mentoringDetails.userId = userId;
        mentoringDetails.mentorId = mentorId;
        mentoringDetails.startDate = startDate;
        mentoringDetails.endDate = endDate;
        mentoringDetails.orderId = orderId;
        mentoringDetails.price = mentor.salaryRate;

        const transactionToken = await create(mentoringDetails, user, mentor);
        mentoringDetails.transactionToken = transactionToken;

        clearEndpoints(['/v1/mentorings']);
        sendResponse(res, mentoringDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllMentorings(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        const mentorings = await findAll(whereClause, order, limit, offset);
        sendResponse(res, mentorings);
        res.locals.data = mentorings;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getMentoringById(req, res, next) {
    try {
        const mentoring = await find(req.params.id);
        sendResponse(res, mentoring);
        res.locals.data = mentoring;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateMentoring(req, res, next) {
    try {
        let { resource, startDate, endDate, rating, feedback } = req.body;
        const mentoringDetails = { resource, startDate, endDate, rating, feedback }
        const id = req.params.id;

        await update(id, mentoringDetails);
        sendResponse(res, mentoringDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addMentoring,
    getAllMentorings,
    getMentoringById,
    updateMentoring
}
