const { auth } = require('../services/auth');
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

module.exports = {
    authUser
}
