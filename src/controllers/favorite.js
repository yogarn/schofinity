const { find, findAll, create } = require('../services/favorite');
const { sendResponse, sendError } = require('../services/responseHandler');
const userServices = require('../services/user');

async function addFavorite(req, res) {
    try {
        let favDetails = req.body;
        favDetails.userId = req.jwt.id;
        await create(favDetails);
        sendResponse(res, favDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getFavorites(req, res, next) {
    try {
        const favorites = await findAll();
        sendResponse(res, favorites);
        res.locals.data = favorites;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getFavorite(req, res, next) {
    try {
        const user = await userServices.find(req.params.username);
        const favorites = await find(user.id);
        console.log(user.id)
        sendResponse(res, favorites);
        res.locals.data = favorites;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

module.exports = {
    addFavorite,
    getFavorite,
    getFavorites
}
