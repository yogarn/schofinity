const { clearEndpoints } = require('../services/cache');
const { create, findAll, find, update, findByUserId, destroy } = require('../services/mentor');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const userServices = require('../services/user');
const onlineClassServices = require('../services/onlineClass');
const resourceServices = require('../services/classResource');
const onlineClassBucket = process.env.ONLINE_CLASS_BUCKET;

async function addMentor(req, res, next) {
    try {
        const { programs, mentoringInterval, breakTime, salaryRate, bank, education } = req.body;
        const mentorDetails = { programs, mentoringInterval, breakTime, salaryRate, bank, education };
        mentorDetails.userId = req.jwt.userId;
        const mentor = await create(mentorDetails);
        sendResponse(res, mentor);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllMentors(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        const mentors = await findAll(whereClause, order, limit, offset);
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
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function updateMentor(req, res, next) {
    try {
        const { programs, mentoringInterval, breakTime, salaryRate, bank, education } = req.body;
        const updateDetails = { programs, mentoringInterval, breakTime, salaryRate, bank, education };

        const userId = req.jwt.userId;
        const mentor = await findByUserId(userId);

        await update(mentor.id, updateDetails);
        sendResponse(res, updateDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteMentor(req, res, next) {
    try {
        const mentorId = req.params.id;
        const mentor = await find(mentorId);

        const onlineClass = await onlineClassServices.findByMentorId(mentorId);
        for (const classItem of onlineClass) {
            if (classItem.image) {
                deleteImage(onlineClassBucket, classItem.image);
            }

            const resources = await resourceServices.findByClassId(classItem.id);
            for (const resourceItem of resources) {
                if (resourceItem.image) {
                    deleteImage(onlineClassBucket, resourceItem.image);
                }
            }
        }

        await destroy(mentorId)
        await userServices.update(mentor.userId, { roleId: 1 });
        sendResponse(res, mentor);
        clearEndpoints(['/v1/classes', '/v1/mentorings', '/v1/schedules']);
        next();
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
