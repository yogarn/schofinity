const db = require('../models/index');
const sequelize = require('../config/sequelize')

const { Mentoring, Mentor, User } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return Mentoring.findAll({
            include: [{ model: Mentor }, { model: User }],
            transaction: t
        });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Mentoring.create(data, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await Mentoring.update(data, { where: { id }, transaction: t });
    });
}

module.exports = {
    findAll,
    create,
    update
}
