const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')

const { Scholarship, EducationLevel, FundingType, Location, Category, Status } = db;

async function findAll(query) {
    const whereClause = {};
    const order = [];

    const validFields = Object.keys(Scholarship.rawAttributes);
    const limit = query.limit ? Math.max(1, parseInt(query.limit)) : undefined;
    const page = query.page ? Math.max(1, parseInt(query.page)) : 1;
    const offset = limit ? (page - 1) * limit : undefined;

    for (const key in query) {
        const value = query[key];

        if (value == '' || value === null || value === undefined) continue;
        if (key === 'limit' || key === 'page' || key === 'sort') continue;
        if (validFields.includes(key)) {
            if (value.includes(',')) {
                const values = value.split(',');
                whereClause[key] = { [Op.or]: values.map(item => ({ [Op.like]: `%${item}%` })) };
            } else {
                whereClause[key] = { [Op.like]: `%${value}%` };
            }
        } else if (key === 'semester') {
            const semester = parseInt(value);
            whereClause.maxSemester = { [Op.gte]: semester };
            whereClause.minSemester = { [Op.lte]: semester };
        }
    }

    if (query.sort) {
        const arraySort = query.sort.split(',');
        arraySort.forEach(field => {
            let orderDirection = 'ASC';
            if (field.startsWith('-')) {
                field = field.replace('-', '');
                orderDirection = 'DESC';
            }
            if (validFields.includes(field)) {
                order.push([field, orderDirection]);
            }
        });
    }

    return sequelize.transaction(async (t) => {
        return Scholarship.findAll({
            include: [{ model: EducationLevel }, { model: FundingType }, { model: Location }, { model: Category }, { model: Status }],
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
        return Scholarship.findOne({
            include: [{ model: EducationLevel }, { model: FundingType }, { model: Location }, { model: Category }, { model: Status }],
            where: { id },
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Scholarship.create(data, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await Scholarship.update(data, { where: { id }, transaction: t });
    });
}

async function destroy(id) {
    return await sequelize.transaction(async (t) => {
        return await Scholarship.destroy({ where: { id }, transaction: t });
    });
}

module.exports = {
    findAll,
    find,
    create,
    update,
    destroy
}
