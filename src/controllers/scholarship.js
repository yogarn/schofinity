const { find, create, update } = require('../services/scholarship');
const sendResponse = require('../middlewares/responseHandler');

async function getScholarships(req, res, next) {
    try {
        const scholarships = await find();
        sendResponse(res, 200, scholarships);
        res.locals.data = scholarships;
        next();
    } catch (e) {
        sendResponse(res, 500, e.message);
    }
};

async function addScholarship(req, res) {
    try {
        const scholarshipDetails = req.body;
        await create(scholarshipDetails);
        sendResponse(res, 200, scholarshipDetails);
    } catch (e) {
        sendResponse(res, 500, e.message);
    }
};

async function updateScholarship(req, res, next) {
    try {
        const id = req.params.id;
        const updateDetails = req.body;
        await update(id, updateDetails);
        sendResponse(res, 200, updateDetails);
    } catch (e) {
        sendResponse(res, 500, e.message);
    }
}

module.exports = {
    addScholarship,
    getScholarships,
    updateScholarship
}
