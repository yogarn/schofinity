const db = require('../models/index');
const sequelize = require('../config/sequelize')
const { Op } = require('sequelize');

const { Favorite, Scholarship, User } = db;

async function findAll(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return Favorite.findAll({
            include: [{ model: Scholarship }],
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
        return Favorite.findOne({
            include: [{ model: Scholarship }],
            where: { id },
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Favorite.create(data, { transaction: t });
    });
};

async function destroy(id) {
    return sequelize.transaction(async (t) => {
        return Favorite.destroy({ where: { id }, transaction: t });
    });
};

async function getUpcomingScholarships() {
    const today = new Date();

    const nextThreeDaysStart = new Date(today);
    nextThreeDaysStart.setDate(nextThreeDaysStart.getDate() + 3);
    nextThreeDaysStart.setHours(0, 0, 0, 0);

    const nextThreeDaysEnd = new Date(nextThreeDaysStart);
    nextThreeDaysEnd.setHours(23, 59, 59, 999);

    return sequelize.transaction(async (t) => {
        return Favorite.findAll({
            include: [
                {
                    model: Scholarship,
                    where: {
                        endDate: {
                            [Op.between]: [nextThreeDaysStart, nextThreeDaysEnd],
                        },
                    },
                },
                { model: User, attributes: { exclude: ['password', 'otp'] } }
            ],
            transaction: t
        });
    });
}

module.exports = {
    find,
    findAll,
    create,
    destroy,
    getUpcomingScholarships,
}
