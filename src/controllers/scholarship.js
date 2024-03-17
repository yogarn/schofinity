const { findAll, find, create, update, destroy } = require('../services/scholarship');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const scholarshipBucket = process.env.SCHOLARSHIP_BUCKET;

async function getAllScholarships(req, res, next) {
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

async function getScholarship(req, res, next) {
    try {
        const scholarships = await find(req.params.id);
        sendResponse(res, scholarships);
        res.locals.data = scholarships;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function addScholarship(req, res, next) {
    try {
        let { name, description, company, image, benefit, requirement, link, startDate, endDate, typeId, locations, categories, educations } = req.body;
        const userId = req.jwt.userId;

        if (req.file && req.file.mimetype === 'image/jpeg') {
            image = await uploadImage(req.file.buffer, scholarshipBucket, `${Date.now()}-${req.file.originalname}`);
        }

        const scholarshipData = { userId, name, description, company, image, benefit, requirement, link, startDate, endDate, typeId, locations, categories, educations };
        const scholarship = await create(scholarshipData);
        sendResponse(res, scholarship);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateScholarship(req, res, next) {
    try {
        const scholarshipId = req.params.id;
        let { name, description, company, image, benefit, requirement, link, startDate, endDate, typeId, locations, categories, educations } = req.body;
        const scholarship = await find(scholarshipId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            image = await uploadImage(req.file.buffer, scholarshipBucket, `${Date.now()}-${req.file.originalname}`);
            if (scholarship.image) {
                await deleteImage(scholarshipBucket, scholarship.image);
            }
        }

        const scholarshipData = { name, description, company, image, benefit, requirement, link, startDate, endDate, typeId, locations, categories, educations };
        await update(scholarshipId, scholarshipData);
        sendResponse(res, scholarshipData);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function acceptScholarship(req, res, next) {
    try {
        const scholarshipId = req.params.id;
        await update(scholarshipId, { statusId: 2 });
        sendResponse(res, { scholarshipId });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteScholarship(req, res, next) {
    try {
        const scholarshipId = req.params.id;
        const scholarship = await find(scholarshipId);

        if (scholarship.image) {
            await deleteImage(scholarshipBucket, scholarship.image);
        }

        await destroy(scholarshipId);
        sendResponse(res, { scholarshipId });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addScholarship,
    getAllScholarships,
    getScholarship,
    updateScholarship,
    acceptScholarship,
    deleteScholarship
}
