const db = require('../models/index');
const sequelize = require('../config/sequelize')
const { Op } = require('sequelize');

const { Feedback, User } = db;

async function findAll(query) {

    const whereClause = {};

    if (query.id) {
        whereClause.id = { [Op.eq]: query.id };
    }

    if (query.userId) {
        whereClause.userId = { [Op.eq]: query.userId };
    }

    if (query.title) {
        whereClause.title = { [Op.like]: `%${query.title}%` };
    }

    if (query.body) {
        whereClause.body = { [Op.like]: `%${query.body}%` };
    }

    return sequelize.transaction(async (t) => {
        return Feedback.findAll({
            include: [{ model: User }],
            where: whereClause,
            limit: query.limit ? parseInt(query.limit) : undefined,
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return Feedback.findOne({
            include: [{ model: User }],
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
