const { create, update, findAll } = require('../services/mentoring');
const mentorServices = require('../services/mentor');
const userServices = require('../services/user');
const { sendResponse, sendError } = require('../services/responseHandler');
const { v4: uuidv4 } = require('uuid');

async function addMentoring(req, res) {
    try {
        const mentoringDetails = req.body;
        const uuid = uuidv4();
        const orderId = `mentoring ${uuid}`;
        const userId = req.jwt.id;

        const mentor = await mentorServices.find(mentoringDetails.mentorId);
        const user = await userServices.findByUserId(userId);

        if (!mentor) {
            throw new Error("Mentor not found")
        }

        if (!user) {
            throw new Error("User not found")
        }

        mentoringDetails.id = uuid;
        mentoringDetails.userId = userId;
        mentoringDetails.orderId = orderId;
        mentoringDetails.price = mentor.salaryRate;
        mentoringDetails.user = user;
        mentoringDetails.mentor = mentor;

        const transactionToken = await create(mentoringDetails);
        mentoringDetails.transactionToken = transactionToken;

        sendResponse(res, mentoringDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllMentorings(req, res, next) {
    try {
        const mentorings = await findAll();
        sendResponse(res, mentorings);
        res.locals.data = mentorings;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateMentoring(req, res, next) {
    try {
        const updateDetails = req.body;
        const id = req.params.id;

        await update(id, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addMentoring,
    getAllMentorings,
    updateMentoring
}
