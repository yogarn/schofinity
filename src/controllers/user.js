const { find, create, update, findAll, getUsername, destroy, findByUserId } = require('../services/user');
const { sendResponse, sendError } = require('../services/responseHandler');
const { uploadImage, deleteImage } = require('../services/supabase');
const { generateOTP } = require('../services/auth');
const { clearEndpoints } = require('../services/cache');
const validator = require('validator');
const onlineClassServices = require('../services/onlineClass');
const resourceServices = require('../services/classResource');
const scholarshipServices = require('../services/scholarship');
const mentorServices = require('../services/mentor');
const userBucket = process.env.USER_BUCKET;
const scholarshipBucket = process.env.SCHOLARSHIP_BUCKET;
const onlineClassBucket = process.env.ONLINE_CLASS_BUCKET;



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

        const user = await create({ username, name, password, contact, description, birthDate, gender, address, email, image });
        await generateOTP(username);
        sendResponse(res, user);
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
        const { whereClause, order, limit, offset } = req;
        const users = await findAll(whereClause, order, limit, offset);
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
        const userId = req.jwt.userId;

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

async function setAdmin(req, res, next) {
    try {
        const userId = req.params.id;
        await update(userId, { roleId: 3 });
        sendResponse(res, { userId, roleId: 3 });
        next();
    } catch (e) {
        console.log(e);
        sendError(res, e.message);
    }
}

async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await findByUserId(userId);

        if (user.image) {
            await deleteImage(userBucket, user.image);
        }

        const scholarships = await scholarshipServices.findByUserId(userId);
        for (const scholarshipItem of scholarships) {
            if (scholarshipItem.image) {
                deleteImage(scholarshipBucket, scholarshipItem.image);
            }
        }

        const mentor = await mentorServices.findByUserId(userId);
        if (mentor) {
            const onlineClass = await onlineClassServices.findByMentorId(mentor.id);
            for (const classItem of onlineClass) {
                if (classItem.image) {
                    deleteImage(onlineClassBucket, classItem.image);
                }
    
                const resources = await resourceServices.findByClassId(classItem.id);
                for (const resourceItem of resources) {
                    if (resourceItem.image) {
                        deleteImage(onlineClassBucket, resourceItem.image);
                    }
                }
            }
        }

        await destroy(userId);
        sendResponse(res, { userId });
        clearEndpoints(['/v1/mentors', '/v1/favorites', '/v1/scholarships', '/v1/mentorings', '/v1/classes', '/v1/feedbacks']);
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
    setAdmin,
    deleteUser
}
