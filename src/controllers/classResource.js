const { findAll, find, create, update } = require('../services/classResource');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const onlineClassBucket = process.env.ONLINE_CLASS_BUCKET;

async function getClassResource(req, res, next) {
    try {
        const classId = req.params.classId;
        const classResource = await findAll(classId);
        sendResponse(res, classResource);
        res.locals.data = classResource;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function addClassResource(req, res, next) {
    try {
        const classResourceDetails = req.body;
        const classId = req.params.classId
        classResourceDetails.classId = classId;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            classResourceDetails.image = await uploadImage(req.file.buffer, onlineClassBucket, `${Date.now()}-${req.file.originalname}`);
        }

        await create(classResourceDetails);
        sendResponse(res, classResourceDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateClassResource(req, res, next) {
    try {
        const classId = req.params.classId;
        const classResourceId = req.params.id;
        const updateDetails = req.body;
        const classResource = await find(classResourceId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, onlineClassBucket, `${Date.now()}-${req.file.originalname}`);
            if (classResource.image) {
                await deleteImage(onlineClassBucket, classResource.image);
            }
        }

        await update(classId, classResourceId, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addClassResource,
    getClassResource,
    updateClassResource
}
