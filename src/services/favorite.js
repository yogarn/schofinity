const db = require('../models/index');
const sequelize = require('../config/sequelize')

const { Favorite, Scholarship } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return Favorite.findAll({
            include: [{ model: Scholarship }],
            attributes: { exclude: ['scholarshipId'] },
            transaction: t
        });
    });
};

async function find(userId) {
    return sequelize.transaction(async (t) => {
        return Favorite.findOne({
            include: [{ model: Scholarship }],
            attributes: { exclude: ['scholarshipId'] },
            where: { userId },
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Favorite.create(data, { transaction: t });
    });
};

module.exports = {
    find,
    findAll,
    create
}
