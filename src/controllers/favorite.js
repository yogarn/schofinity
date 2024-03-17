const { find, findAll, create, destroy } = require('../services/favorite');
const { sendResponse, sendError } = require('../services/responseHandler');

async function addFavorite(req, res, next) {
    try {
        const { scholarshipId } = req.body;
        let favDetails = { scholarshipId };
        favDetails.userId = req.jwt.userId;
        const favorite = await create(favDetails);
        sendResponse(res, favorite);
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllFavorites(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        const favorites = await findAll(whereClause, order, limit, offset);
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
