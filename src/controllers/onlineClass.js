const { findAll, find, create, update, buy, destroy, findAllPayments, findPayment } = require('../services/onlineClass');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { findByUserId } = require('../services/mentor');
const { clearEndpoints } = require('../services/cache');

const userServices = require('../services/user');
const resourceServices = require('../services/classResource');

const { v4: uuidv4 } = require('uuid');
const onlineClassBucket = process.env.ONLINE_CLASS_BUCKET;

async function getAllOnlineClass(req, res, next) {
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

async function getOnlineClass(req, res, next) {
    try {
        const classId = req.params.classId;
        const onlineClass = await find(classId);
        sendResponse(res, onlineClass);
        res.locals.data = onlineClass;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function addOnlineClass(req, res, next) {
    try {
        const { name, description, image, community, typeId, subjects, startDate, endDate, price } = req.body;
        const onlineClassDetails = { name, description, image, community, typeId, subjects, startDate, endDate, price };
        const mentor = await findByUserId(req.jwt.userId);
        onlineClassDetails.mentorId = mentor.id;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            onlineClassDetails.image = await uploadImage(req.file.buffer, onlineClassBucket, `${Date.now()}-${req.file.originalname}`);
        }

        const onlineClass = await create(onlineClassDetails);
        sendResponse(res, onlineClass);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateOnlineClass(req, res, next) {
    try {
        const onlineClassId = req.params.classId;
        const { name, description, image, community, typeId, subjects, startDate, endDate, price } = req.body;
        const updateDetails = { name, description, image, community, typeId, subjects, startDate, endDate, price };
        const onlineClass = await find(onlineClassId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, onlineClassBucket, `${Date.now()}-${req.file.originalname}`);
            if (onlineClass.image) {
                await deleteImage(onlineClassBucket, onlineClass.image);
            }
        }

        await update(onlineClassId, updateDetails);
        sendResponse(res, updateDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteOnlineClass(req, res, next) {
    try {
        const onlineClassId = req.params.classId;
        const onlineClass = await find(onlineClassId);

        if (onlineClass.image) {
            await deleteImage(onlineClassBucket, onlineClass.image);
        }

        const resources = await resourceServices.findByClassId(onlineClassId);
        for (const item of resources) {
            if (item.image) {
                await deleteImage(onlineClassBucket, item.image);
            }
        }

        await destroy(onlineClassId);
        sendResponse(res, { onlineClassId });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function buyOnlineClass(req, res, next) {
    try {
        const classId = req.params.classId;
        const classPaymentDetails = {};
        const uuid = uuidv4();
        const userId = req.jwt.userId;

        const onlineClass = await find(classId);
        const user = await userServices.findByUserId(userId);

        classPaymentDetails.id = uuid;
        classPaymentDetails.userId = userId;
        classPaymentDetails.orderId = `class ${uuid}`;
        classPaymentDetails.classId = classId;
        classPaymentDetails.price = onlineClass.price;
        classPaymentDetails.user = user;
        classPaymentDetails.onlineClass = onlineClass;
        classPaymentDetails.rating = req.body.rating;
        classPaymentDetails.feedback = req.body.feedback;

        const transactionToken = await buy(classPaymentDetails);
        classPaymentDetails.transactionToken = transactionToken;
        
        clearEndpoints(['/v1/classes/payments']);
        sendResponse(res, classPaymentDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function getPayments(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        const payments = await findAllPayments(whereClause, order, limit, offset);
        sendResponse(res, payments);
        res.locals.data = payments;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getPaymentsById(req, res, next) {
    try {
        const payment = await findPayment(req.params.id);
        sendResponse(res, payment);
        res.locals.data = payment;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

module.exports = {
    getAllOnlineClass,
    getOnlineClass,
    addOnlineClass,
    updateOnlineClass,
    deleteOnlineClass,
    buyOnlineClass,
    getPayments,
    getPaymentsById
}
