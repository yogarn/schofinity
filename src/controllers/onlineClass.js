const { findAll, find, create, update } = require('../services/onlineclass');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { getMentorByUserId } = require('../services/mentor');
const onlineClassBucket = process.env.ONLINE_CLASS_BUCKET;

async function getOnlineClass(req, res, next) {
    try {
        const onlineClass = await findAll(req.query);
        sendResponse(res, onlineClass);
        res.locals.data = onlineClass;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function addOnlineClass(req, res) {
    try {
        const onlineClassDetails = req.body;
        const mentor = await getMentorByUserId(req.jwt.id);
        onlineClassDetails.mentorId = mentor.id;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            onlineClassDetails.image = await uploadImage(req.file.buffer, onlineClassBucket, `${Date.now()}-${req.file.originalname}`);
        }

        await create(onlineClassDetails);
        sendResponse(res, onlineClassDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateOnlineClass(req, res, next) {
    try {
        const onlineClassId = req.params.id;
        const updateDetails = req.body;
        const onlineClass = await find(onlineClassId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, onlineClassBucket, `${Date.now()}-${req.file.originalname}`);
            if (onlineClass.image) {
                await deleteImage(onlineClassBucket, scholarship.image);
            }
        }

        await update(onlineClassId, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    getOnlineClass,
    addOnlineClass,
    updateOnlineClass
}
