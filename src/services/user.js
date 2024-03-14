const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')
const bcrypt = require('bcrypt');

const { User, Role } = db;

async function findAll(query) {

    const whereClause = {};

    if (query.id) {
        whereClause.id = { [Op.eq]: query.id };
    }
    
    if (query.name) {
        whereClause.name = { [Op.like]: `%${query.name}%` };
    }

    if (query.username) {
        whereClause.username = { [Op.like]: `%${query.username}%` };
    }

    if (query.email) {
        whereClause.email = { [Op.like]: `%${query.email}%` };
    }

    if (query.statusId) {
        whereClause.statusId = { [Op.eq]: query.statusId };
    }

    return sequelize.transaction(async (t) => {
        return User.findAll({
            include: [{ model: Role }],
            attributes: { exclude: ['password', 'otp'] },
            where: whereClause,
            limit: query.limit ? parseInt(query.limit) : undefined,
            transaction: t
        });
    });
};

async function find(username) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            include: [{ model: Role }],
            attributes: { exclude: ['password', 'otp'] },
            where: { username },
            transaction: t
        });
    });
}

async function findByUserId(id) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            include: [{ model: Role }],
            attributes: { exclude: ['password', 'otp'] },
            where: { id },
            transaction: t
        });
    });
}

async function getUsername(id) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            where: { id },
            attributes: ['username'],
            transaction: t
        });
    });
}

async function getUserId(username) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            where: { username },
            attributes: ['id'],
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        const { username, name, password, contact, email, image, roleId } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({
            username, password: hashedPassword, name, contact, email, image, roleId
        }, { transaction: t });
    });
};

async function update(id, data) {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return await sequelize.transaction(async (t) => {
        return await User.update(data, { where: { id }, transaction: t });
    });
}

async function destroy(id) {
    return await sequelize.transaction(async (t) => {
        return await User.destroy({ where: { id }, transaction: t });
    });
}

module.exports = {
    find,
    findAll,
    findByUserId,
    getUsername,
    getUserId,
    create,
    update,
    destroy
}
