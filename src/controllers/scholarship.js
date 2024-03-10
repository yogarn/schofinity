const { findAll, find, create, update } = require('../services/scholarship');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const scholarshipBucket = process.env.SCHOLARSHIP_BUCKET;

async function getScholarships(req, res, next) {
    try {
        const scholarships = await findAll(req.query);
        sendResponse(res, scholarships);
        res.locals.data = scholarships;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function addScholarship(req, res) {
    try {
        const scholarshipDetails = req.body;
        scholarshipDetails.userId = req.jwt.id;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            scholarshipDetails.image = await uploadImage(req.file.buffer, scholarshipBucket, `${Date.now()}-${req.file.originalname}`);
        }

        await create(scholarshipDetails);
        sendResponse(res, scholarshipDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateScholarship(req, res, next) {
    try {
        const scholarshipId = req.params.id;
        const updateDetails = req.body;
        const scholarship = await find(scholarshipId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, scholarshipBucket, `${Date.now()}-${req.file.originalname}`);
            if (scholarship.image) {
                await deleteImage(scholarshipBucket, scholarship.image);
            }
        }

        await update(scholarshipId, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addScholarship,
    getScholarships,
    updateScholarship
}
