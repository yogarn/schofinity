const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')

const { ResourceComment, User, ClassResource } = db;

async function create(data) {
    return sequelize.transaction(async (t) => {
        return ResourceComment.create(data, { transaction: t });
    });
};

async function findAll(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return ResourceComment.findAll({
            include: [{ model: User, attributes: { exclude: ['roleId', 'password', 'otp'] } }, { model: ClassResource }],
            where: whereClause,
            limit: limit,
            offset: offset,
            order: order,
            transaction: t
        });
    });
};

async function find(resourceId, id) {
    return sequelize.transaction(async (t) => {
        return ResourceComment.findOne({
            include: [{ model: User, attributes: { exclude: ['roleId', 'password', 'otp'] } }, { model: ClassResource }],
            where: { resourceId, id },
            transaction: t
        });
    });
};

async function update(resourceId, id, data) {
    return await sequelize.transaction(async (t) => {
        return await ResourceComment.update(data, { where: { resourceId, id }, transaction: t });
    });
}

async function destroy(resourceId, id) {
    return await sequelize.transaction(async (t) => {
        return await ResourceComment.destroy({ where: { resourceId, id }, transaction: t });
    });
}

module.exports = {
    create,
    findAll,
    find,
    update,
    destroy
}
