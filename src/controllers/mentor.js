const { create, findAll, update } = require('../services/mentor');
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

async function acceptMentor(req, res, next) {
    try {
        const username = req.params.username;
        const user = await userServices.getUserId(username);

        if (!user) {
            throw new Error("Username not found");
        }

        await update(user.id, { statusId: 2 });
        await userServices.update(username, { roleId: 2 });
        sendResponse(res, user);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function updateMentor(req, res, next) {
    try {
        const updateDetails = req.body;
        let userId;

        if (req.params.username) {
            const user = await userServices.getUserId(username);

            if (!user) {
                throw new Error("Username not found");
            } else {
                userId = user.id;
            }
        } else {
            userId = req.jwt.id;
        }

        await update(userId, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addMentor,
    getAllMentors,
    acceptMentor,
    updateMentor
}
