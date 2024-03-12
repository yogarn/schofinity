const db = require('../models/index');
const sequelize = require('../config/sequelize');

const { User, Mentor, MentorSchedule } = db;

async function create(data) {
    return sequelize.transaction(async (t) => {
        return MentorSchedule.create(data, { transaction: t });
    });
};

async function findAll() {
    return sequelize.transaction(async (t) => {
        return MentorSchedule.findAll({
            include: [{ model: Mentor, include: [{ model: User, attributes: { exclude: ['password', 'otp'] } }] }],
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
