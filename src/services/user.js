const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')
const bcrypt = require('bcrypt');

const { User, Role, Status } = db;

async function findAll(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return User.findAll({
            attributes: { exclude: ['password', 'otp'] },
            include: [
                { model: Status, as: 'userStatus' },
                { model: Role, as: 'userRole' }
            ],
            where: whereClause,
            limit: limit,
            offset: offset,
            order: order,
            transaction: t
        });
    });
};

async function find(username) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            attributes: { exclude: ['password', 'otp'] },
            where: { username },
            transaction: t
        });
    });
}

async function findByUserId(id) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            attributes: { exclude: ['password', 'otp'] },
            include: [
                { model: Status, as: 'userStatus' },
                { model: Role, as: 'userRole' }
            ],
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
        data.password = await bcrypt.hash(data.password, 10);
        return User.create(data, { transaction: t });
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
