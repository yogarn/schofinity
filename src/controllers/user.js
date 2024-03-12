const { find, create, update, findAll, getUsername, destroy, findByUserId } = require('../services/user');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { generateOTP } = require('../services/auth');
const validator = require('validator');
const userBucket = process.env.USER_BUCKET;

async function addUser(req, res) {
    try {
        const userDetails = req.body;

        if (!validator.isStrongPassword(userDetails.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            throw new Error("Invalid password");
        } else if (!validator.isMobilePhone(userDetails.contact, ['id-ID'])) {
            throw new Error("Invalid contact");
        } else if (!validator.isEmail(userDetails.email)) {
            throw new Error("Invalid email");
        }

        if (req.file && req.file.mimetype === 'image/jpeg') {
            userDetails.image = await uploadImage(req.file.buffer, userBucket, `${userDetails.username}-${req.file.originalname}`);
        }

        await create(userDetails);
        await generateOTP(userDetails.username);
        sendResponse(res, userDetails);
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getUser(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await findByUserId(userId);
        sendResponse(res, user);
        res.locals.data = user;
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
};

async function getAllUsers(req, res, next) {
    try {
        const users = await findAll(req.query);
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
        const { username } = await getUsername(req.jwt.id);

        const updateDetails = req.body;
        if (updateDetails.password && !validator.isStrongPassword(updateDetails.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            throw new Error("Invalid password");
        } else if (updateDetails.contact && !validator.isMobilePhone(updateDetails.contact, ['id-ID'])) {
            throw new Error("Invalid contact");
        } else if (updateDetails.email && !validator.isEmail(updateDetails.email)) {
            throw new Error("Invalid email");
        }

        const user = await find(username);

        if (!user) {
            throw new Error("Username not found");
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

async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;

        await destroy(userId);
        sendResponse(res, { userId });
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}
