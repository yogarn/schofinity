const { create, findAll, find, update, destroy } = require('../services/resourceComment');
const { sendResponse, sendError } = require('../services/responseHandler');

async function addComment(req, res, next) {
    try {
        const { comment } = req.body;
        const userId = req.jwt.id;
        const resourceId = req.params.resourceId;
        const createComment = await create({ comment, userId, resourceId });
        sendResponse(res, { createComment });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllComment(req, res, next) {
    try {
        const { whereClause, order, limit, offset } = req;
        whereClause.resourceId = req.params.resourceId;
        const resourceComment = await findAll(whereClause, order, limit, offset);
        sendResponse(res, resourceComment);
        res.locals.data = resourceComment;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getComment(req, res, next) {
    try {
        const { resourceId, id } = req.params;
        const resourceComment = await find(resourceId, id);
        sendResponse(res, resourceComment);
        res.locals.data = resourceComment;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateComment(req, res, next) {
    try {
        const { comment } = req.body;
        const resourceId = req.params.resourceId;
        const id = req.params.id;

        await update(resourceId, id, { comment });
        sendResponse(res, { resourceId, id, comment });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteComment(req, res, next) {
    try {
        const id = req.params.id;
        const resourceId = req.params.resourceId;

        await destroy(resourceId, id);
        sendResponse(res, { resourceId, id });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addComment,
    getAllComment,
    getComment,
    updateComment,
    deleteComment
}
