const { find, create, update, validate, findAll } = require('../services/user');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const userBucket = process.env.USER_BUCKET;

async function addUser(req, res) {
    try {
        const userDetails = req.body;
        
        if (req.file && req.file.mimetype === 'image/jpeg') {
            userDetails.image = await uploadImage(req.file.buffer, userBucket, `${userDetails.username}-${req.file.originalname}`);
        }

        await create(userDetails);
        sendResponse(res, userDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getUsers(req, res, next) {
    try {
        const users = await findAll();
        sendResponse(res, users);
        res.locals.data = users;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function updateUser(req, res, next) {
    try {
        const updateDetails = req.body;
        const username = req.params.username;
        const user = await find(username);

        if (!user) {
            throw new Error("User doesn't exists");
        }

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, userBucket, `${username}-${req.file.originalname}`);
            if (user.image) {
                await deleteImage(userBucket, user.image);
            }
        }

        await update(username, updateDetails);
        sendResponse(res, updateDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addUser,
    getUsers,
    updateUser
}
