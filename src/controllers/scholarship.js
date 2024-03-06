const { findAll, find, create, update } = require('../services/scholarship');
const sendResponse = require('../middlewares/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const scholarshipBucket = process.env.SCHOLARSHIP_BUCKET;

async function getScholarships(req, res, next) {
    try {
        const scholarships = await findAll(req.query);
        
        sendResponse(res, 200, scholarships);
        res.locals.data = scholarships;
        next();
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
};

async function addScholarship(req, res) {
    try {
        const scholarshipDetails = req.body;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            scholarshipDetails.image = await uploadImage(req.file.buffer, scholarshipBucket, `${Date.now()}-${req.file.originalname}`);
        }

        await create(scholarshipDetails);
        sendResponse(res, 200, scholarshipDetails);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
};

async function updateScholarship(req, res, next) {
    try {
        const id = req.params.id;
        const updateDetails = req.body;
        const scholarship = await find(id);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, scholarshipBucket, `${Date.now()}-${req.file.originalname}`);
            if (scholarship.image) {
                await deleteImage(scholarshipBucket, scholarship.image);
            }
        }

        await update(id, updateDetails);
        sendResponse(res, 200, updateDetails);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
}

module.exports = {
    addScholarship,
    getScholarships,
    updateScholarship
}
