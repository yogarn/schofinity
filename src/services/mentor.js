const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')

const { User, Mentor, MentorSchedule, Status } = db;

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Mentor.create(data, { transaction: t });
    });
};

async function findAll(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return Mentor.findAll({
            include: [
                { model: User, attributes: { exclude: ['password', 'otp'] } },
                { model: MentorSchedule },
                { model: Status, as: 'mentorStatus' }
            ],
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
        return Mentor.findOne({
            include: [
                { model: User, attributes: { exclude: ['password', 'otp'] } },
                { model: MentorSchedule },
                { model: Status, as: 'mentorStatus' }
            ],
            where: { id },
            transaction: t
        });
    });
};

async function findByUserId(userId) {
    return sequelize.transaction(async (t) => {
        return Mentor.findOne({
            where: { userId },
            include: [{ model: User, attributes: { exclude: ['password', 'otp'] } }, { model: MentorSchedule }],
            transaction: t
        });
    });
}

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await Mentor.update(data, { where: { id }, transaction: t });
    });
}

async function destroy(id) {
    return await sequelize.transaction(async (t) => {
        return await Mentor.destroy({ where: { id }, transaction: t });
    });
}

module.exports = {
    create,
    findAll,
    find,
    findByUserId,
    update,
    destroy
}
