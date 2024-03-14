const { find, create, update, findAll, getUsername, destroy, findByUserId } = require('../services/user');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { generateOTP } = require('../services/auth');
const validator = require('validator');
const userBucket = process.env.USER_BUCKET;

async function addUser(req, res, next) {
    try {
        let { username, name, password, contact, description, birthDate, gender, address, email, image } = req.body;
        if (password && !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            throw new Error("Invalid password");
        } else if (contact && !validator.isMobilePhone(contact, ['id-ID'])) {
            throw new Error("Invalid contact");
        } else if (email && !validator.isEmail(email)) {
            throw new Error("Invalid email");
        }

        if (req.file && req.file.mimetype === 'image/jpeg') {
            image = await uploadImage(req.file.buffer, userBucket, `${username}-${req.file.originalname}`);
        }

        await create({ username, name, password, contact, description, birthDate, gender, address, email, image });
        await generateOTP(username);
        sendResponse(res, { username, name, password, contact, description, birthDate, gender, address, email, image });
        next();
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
        const userId = req.jwt.id;

        let { username, name, password, contact, description, birthDate, gender, address, email, image } = req.body;
        if (password && !validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            throw new Error("Invalid password");
        } else if (contact && !validator.isMobilePhone(contact, ['id-ID'])) {
            throw new Error("Invalid contact");
        } else if (email && !validator.isEmail(email)) {
            throw new Error("Invalid email");
        }

        const user = await findByUserId(userId);

        if (req.file && req.file.mimetype === 'image/jpeg') {
            image = await uploadImage(req.file.buffer, userBucket, `${user.username}-${req.file.originalname}`);
            if (user.image) {
                await deleteImage(userBucket, user.image);
            }
        }

        await update(userId, { username, name, password, contact, description, birthDate, gender, address, email, image });
        sendResponse(res, { username, name, password, contact, description, birthDate, gender, address, email, image });
        next();
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
        next();
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
