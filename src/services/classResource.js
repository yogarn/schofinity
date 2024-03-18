const db = require('../models/index');
const sequelize = require('../config/sequelize');

const { ClassResource } = db;

async function findAll(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return ClassResource.findAll({
            where: whereClause,
            limit: limit,
            offset: offset,
            order: order,
            transaction: t
        });
    });
};

async function findByClassId(classId) {
    return sequelize.transaction(async (t) => {
        return ClassResource.findAll({
            where: { classId },
            transaction: t
        });
    });
};

async function find(classId, id) {
    return sequelize.transaction(async (t) => {
        return ClassResource.findOne({
            where: { classId, id },
            transaction: t
        });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        return ClassResource.create(data, { transaction: t });
    });
};

async function update(classId, id, data) {
    return await sequelize.transaction(async (t) => {
        return await ClassResource.update(data, { where: { classId, id }, transaction: t });
    });
};

async function destroy(classId, id) {
    return await sequelize.transaction(async (t) => {
        return await ClassResource.destroy({ where: { classId, id }, transaction: t });
    });
}

module.exports = {
    findAll,
    findByClassId,
    find,
    create,
    update,
    destroy
}
