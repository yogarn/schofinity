const { find, findAll, create } = require('../services/feedback');
const { sendResponse, sendError } = require('../services/responseHandler');

async function addFeedback(req, res, next) {
    try {
        const feedbackDetails = req.body;
        feedbackDetails.userId = req.jwt.id;
        await create(feedbackDetails);
        sendResponse(res, feedbackDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllFeedback(req, res, next) {
    try {
        const feedbacks = await findAll(req.query);
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
