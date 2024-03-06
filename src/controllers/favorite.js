const { find, findAll, create } = require('../services/favorite');
const sendResponse = require('../middlewares/responseHandler');
const userServices = require('../services/user');

async function addFavorite(req, res) {
    try {
        let favDetails = req.body;
        favDetails.userId = req.jwt.id;
        await create(favDetails);
        sendResponse(res, 200, favDetails);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
};

async function getFavorites(req, res, next) {
    try {
        const favorites = await findAll();
        sendResponse(res, 200, favorites);
        res.locals.data = favorites;
        next();
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
};

async function getFavorite(req, res, next) {
    try {
        const user = await userServices.find(req.params.username);
        const favorites = await find(user.id);
        console.log(user.id)
        sendResponse(res, 200, favorites);
        res.locals.data = favorites;
        next();
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
};

module.exports = {
    addFavorite,
    getFavorite,
    getFavorites
}
