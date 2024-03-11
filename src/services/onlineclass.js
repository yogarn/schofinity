const db = require('../models/index');
const sequelize = require('../config/sequelize');

const { OnlineClass, Mentor } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return OnlineClass.findAll({
            include: [{ model: Mentor }],
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return OnlineClass.findOne({
            include: [{ model: Mentor }],
            where: { id },
            transaction: t
        });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        return OnlineClass.create(data, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await OnlineClass.update(data, { where: { id }, transaction: t });
    });
}

module.exports = {
    findAll,
    find,
    create,
    update,
}
