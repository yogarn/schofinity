const { auth, activate, resetPassword, generateOTP } = require('../services/auth');
const sendResponse = require('../middlewares/responseHandler');

async function authUser(req, res) {
    try {
        const userDetails = req.body;
        const result = await auth(userDetails);
        await sendResponse(res, 200, result);
    } catch (e) {
        if (e.message === "Username not found") {
            return sendResponse(res, 404, e.message);
        } else if (e.message === "Incorrect password") {
            return sendResponse(res, 401, e.message);
        }
        sendResponse(res, 500, "Internal Server Error");
        console.log(e);
    }
};

async function activateUser(req, res) {
    try {
        const userDetails = req.body;
        const result = await activate(userDetails);
        await sendResponse(res, 200, result);
    } catch (e) {
        if (e.message === "Username not found") {
            return sendResponse(res, 404, e.message);
        } else if (e.message === "Incorrect OTP") {
            return sendResponse(res, 401, e.message);
        }
        sendResponse(res, 500, "Internal Server Error");
        console.log(e);
    }
};

async function resetUserPassword(req, res) {
    try {
        const userDetails = req.body;
        const result = await resetPassword(userDetails);
        await sendResponse(res, 200, result);
    } catch (e) {
        if (e.message === "Username not found") {
            return sendResponse(res, 404, e.message);
        } else if (e.message === "Incorrect OTP") {
            return sendResponse(res, 401, e.message);
        }
        sendResponse(res, 500, "Internal Server Error");
        console.log(e);
    }
};

async function sendOTP(req, res) {
    try {
        const username = req.body.username;
        const result = await generateOTP(username);
        await sendResponse(res, 200, result);
    } catch (e) {
        if (e.message === "Username not found") {
            return sendResponse(res, 404, e.message);
        } else if (e.message === "Incorrect OTP") {
            return sendResponse(res, 401, e.message);
        }
        sendResponse(res, 500, "Internal Server Error");
        console.log(e);
    }
};

module.exports = {
    authUser,
    activateUser,
    resetUserPassword,
    sendOTP
}
