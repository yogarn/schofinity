const { find, findAll, create } = require('../services/feedback');
const { sendResponse, sendError } = require('../services/responseHandler');

async function addFeedback(req, res, next) {
    try {
        const { title, body } = req.body;
        const feedbackDetails = { title, body };
        feedbackDetails.userId = req.jwt.id;
        const feedback = await create(feedbackDetails);
        sendResponse(res, feedback);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllFeedback(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        const feedbacks = await findAll(whereClause, order, limit, offset);
        sendResponse(res, feedbacks);
        res.locals.data = feedbacks;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getFeedback(req, res, next) {
    try {
        const feedback = await find(req.params.id);
        sendResponse(res, feedback);
        res.locals.data = feedback;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

module.exports = {
    addFeedback,
    getAllFeedback,
    getFeedback
}
