const db = require('../models/index');
const sequelize = require('../config/sequelize')

const { User, Mentor, MentorSchedule } = db;

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Mentor.create(data, { transaction: t });
    });
};

async function findAll() {
    return sequelize.transaction(async (t) => {
        return Mentor.findAll({
            include: [{ model: User, attributes: { exclude: ['roleId', 'password'] } }, { model: MentorSchedule }],
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return Mentor.findOne({
            include: [{ model: User, attributes: { exclude: ['roleId', 'password'] } }, { model: MentorSchedule }],
            where: { id },
            transaction: t
        });
    });
};

async function getMentorByUserId(userId) {
    return sequelize.transaction(async (t) => {
        return Mentor.findOne({
            where: { userId },
            attributes: ['id'],
            transaction: t
        });
    });
}

async function update(userId, data) {
    return await sequelize.transaction(async (t) => {
        return await Mentor.update(data, { where: { userId }, transaction: t });
    });
}

module.exports = {
    create,
    findAll,
    find,
    getMentorByUserId,
    update
}
