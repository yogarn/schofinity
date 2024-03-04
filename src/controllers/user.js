const { find, create, update } = require('../services/user');
const sendResponse = require('../middlewares/responseHandler');

async function addUser(req, res) {
    try {
        const userDetails = req.body;
        await create(userDetails);
        sendResponse(res, 200, userDetails);
    } catch (e) {
        sendResponse(res, 500, e.message);
    }
};

async function getUsers(req, res, next) {
    try {
        const users = await find();
        sendResponse(res, 200, users);
        res.locals.data = users;
        next();
    } catch (e) {
        sendResponse(res, 500, e.message);
    }
};

async function updateUser(req, res, next) {
    try {
        const username = req.params.username;
        const updateDetails = req.body;
        await update(username, updateDetails);
        sendResponse(res, 200, updateDetails);
    } catch (e) {
        sendResponse(res, 500, e.message);
    }
}

module.exports = {
    addUser,
    getUsers,
    updateUser
}
