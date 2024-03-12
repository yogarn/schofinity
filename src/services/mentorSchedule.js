const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize');

const { User, Mentor, MentorSchedule } = db;

async function create(data) {
    return sequelize.transaction(async (t) => {
        return MentorSchedule.create(data, { transaction: t });
    });
};

async function findAll(query) {

    const whereClause = {};

    if (query.mentorId) {
        whereClause.mentorId = { [Op.eq]: query.mentorId };
    }

    if (query.day) {
        whereClause.day = { [Op.eq]: query.day };
    }

    if (query.startTime) {
        whereClause.startTime = { [Op.like]: `%${query.startTime}%` };
    }

    if (query.endTime) {
        whereClause.endTime = { [Op.like]: `%${query.endTime}%` };
    }

    return sequelize.transaction(async (t) => {
        return MentorSchedule.findAll({
            include: [{ model: Mentor, include: [{ model: User, attributes: { exclude: ['password', 'otp'] } }] }],
            where: whereClause,
            limit: query.limit ? parseInt(query.limit) : undefined,
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return MentorSchedule.findOne({
            include: [{ model: Mentor, include: [{ model: User, attributes: { exclude: ['password', 'otp'] } }] }],
            where: { id },
            transaction: t
        });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await MentorSchedule.update(data, { where: { id }, transaction: t });
    });
}

async function destroy(id) {
    return await sequelize.transaction(async (t) => {
        return await MentorSchedule.destroy({ where: { id }, transaction: t });
    });
}

module.exports = {
    create,
    findAll,
    find,
    update,
    destroy
}
