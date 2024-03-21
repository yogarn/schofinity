const db = require('../models/index');
const sequelize = require('../config/sequelize')
const { Op } = require('sequelize');

const { Feedback, User } = db;

async function findAll(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return Feedback.findAll({
            include: [{ model: User, attributes: { exclude: ['password', 'otp'] } }],
            where: whereClause,
            limit: limit,
            offset: offset,
            order: order,
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return Feedback.findOne({
            include: [{ model: User, attributes: { exclude: ['password', 'otp'] } }],
            where: { id },
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Feedback.create(data, { transaction: t });
    });
};

module.exports = {
    findAll,
    find,
    create
}
