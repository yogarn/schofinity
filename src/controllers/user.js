const { find, create, update, validate, findAll } = require('../services/user');
const sendResponse = require('../middlewares/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');

async function addUser(req, res) {
    try {
        const userDetails = req.body;
        
        if (req.file && req.file.mimetype === 'image/jpeg') {
            userDetails.image = await uploadImage(req.file.buffer, 'users', `${userDetails.username}-${req.file.originalname}`);
        }

        await create(userDetails);
        sendResponse(res, 200, userDetails);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
};

async function getUsers(req, res, next) {
    try {
        const users = await findAll();
        sendResponse(res, 200, users);
        res.locals.data = users;
        next();
    } catch (e) {
        sendResponse(res, 500, e.errors);
    }
};

async function updateUser(req, res, next) {
    try {
        const updateDetails = req.body;
        const username = req.params.username;
        const user = await find(username);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            updateDetails.image = await uploadImage(req.file.buffer, 'users', `${username}-${req.file.originalname}`);
            if (user.image) {
                await deleteImage('users', user.image);
            }
        }

        await update(username, updateDetails);
        sendResponse(res, 200, updateDetails);
    } catch (e) {
        console.log(e);
        sendResponse(res, 500, e.errors);
    }
}

module.exports = {
    addUser,
    getUsers,
    updateUser
}
