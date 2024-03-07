const { auth, activate, resetPassword, generateOTP } = require('../services/auth');
const { sendResponse, sendError } = require('../services/responseHandler');

async function authUser(req, res) {
    try {
        const userDetails = req.body;
        const result = await auth(userDetails);
        await sendResponse(res, result);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function activateUser(req, res) {
    try {
        const userDetails = req.body;
        const result = await activate(userDetails);
        await sendResponse(res, result);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function resetUserPassword(req, res) {
    try {
        const userDetails = req.body;
        const result = await resetPassword(userDetails);
        await sendResponse(res, result);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function sendOTP(req, res) {
    try {
        const username = req.body.username;
        const result = await generateOTP(username);
        await sendResponse(res, result);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

module.exports = {
    authUser,
    activateUser,
    resetUserPassword,
    sendOTP
}
