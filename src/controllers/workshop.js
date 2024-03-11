const { findAll, find, create, update } = require('../services/workshop');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { getMentorByUserId } = require('../services/mentor');
const workshopBucket = process.env.WORKSHOP_BUCKET;

async function getWorkshops(req, res, next) {
    try {
        const workshops = await findAll(req.query);
        sendResponse(res, workshops);
        res.locals.data = workshops;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function addWorkshop(req, res) {
    try {
        const workshopDetails = req.body;
        const mentor = await getMentorByUserId(req.jwt.id);
        workshopDetails.mentorId = mentor.id;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            workshopDetails.image = await uploadImage(req.file.buffer, workshopBucket, `${Date.now()}-${req.file.originalname}`);
        }

        await create(workshopDetails);
        sendResponse(res, workshopDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateWorkshop(req, res, next) {
    try {
        const workshopId = req.params.id;
        const updateDetails = req.body;
        const workshop = await find(workshopId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, workshopBucket, `${Date.now()}-${req.file.originalname}`);
            if (workshop.image) {
                await deleteImage(workshopBucket, scholarship.image);
            }
        }

        await update(workshopId, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    getWorkshops,
    addWorkshop,
    updateWorkshop
}
