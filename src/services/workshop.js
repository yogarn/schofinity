const db = require('../models/index');
const sequelize = require('../config/sequelize');

const { Workshop, Mentor } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return Workshop.findAll({
            include: [{ model: Mentor }],
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return Workshop.findOne({
            include: [{ model: Mentor }],
            where: { id },
            transaction: t
        });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Workshop.create(data, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await Workshop.update(data, { where: { id }, transaction: t });
    });
}

module.exports = {
    findAll,
    find,
    create,
    update,
}
