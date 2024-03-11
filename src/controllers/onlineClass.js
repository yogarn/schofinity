const { findAll, find, create, update, buy } = require('../services/onlineClass');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { getMentorByUserId } = require('../services/mentor');
const userServices = require('../services/user');
const { v4: uuidv4 } = require('uuid');
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

async function buyOnlineClass(req, res, next) {
    try {
        const classPaymentDetails = req.body;
        const uuid = uuidv4();
        const userId = req.jwt.id;

        const onlineClass = await find(classPaymentDetails.classId);
        const user = await userServices.findByUserId(userId);

        if (!onlineClass) {
            throw new Error("Class not found")
        }

        if (!user) {
            throw new Error("User not found")
        }

        classPaymentDetails.id = uuid;
        classPaymentDetails.userId = userId;
        classPaymentDetails.orderId = `class ${uuid}`;
        classPaymentDetails.price = onlineClass.price;
        classPaymentDetails.user = user;
        classPaymentDetails.onlineClass = onlineClass;

        const transactionToken = await buy(classPaymentDetails);
        classPaymentDetails.transactionToken = transactionToken;

        sendResponse(res, classPaymentDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    getOnlineClass,
    addOnlineClass,
    updateOnlineClass,
    buyOnlineClass
}