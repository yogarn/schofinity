const { find, findAll, create, destroy } = require('../services/favorite');
const { sendResponse, sendError } = require('../services/responseHandler');
const userServices = require('../services/user');

async function addFavorite(req, res, next) {
    try {
        let favDetails = req.body;
        favDetails.userId = req.jwt.id;
        await create(favDetails);
        sendResponse(res, favDetails);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllFavorites(req, res, next) {
    try {
        const favorites = await findAll(req.query);
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
        const favorites = await find(req.params.id);
        sendResponse(res, favorites);
        res.locals.data = favorites;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function deleteFavorite(req, res, next) {
    try {
        await destroy(req.params.id);
        sendResponse(res, req.params.id);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

module.exports = {
    addFavorite,
    getFavorite,
    getAllFavorites,
    deleteFavorite
}
