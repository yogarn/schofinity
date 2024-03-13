const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')

const { Scholarship, EducationLevel, FundingType, Location, Category, Status } = db;

async function findAll(query) {

    const whereClause = {};

    if (query.id) {
        whereClause.id = { [Op.eq]: query.id };
    }

    if (query.name) {
        whereClause.name = { [Op.like]: `%${query.name}%` };
    }

    if (query.description) {
        whereClause.description = { [Op.like]: `%${query.description}%` };
    }

    if (query.benefit) {
        whereClause.benefit = { [Op.like]: `%${query.benefit}%` };
    }

    if (query.requirement) {
        whereClause.requirement = { [Op.like]: `%${query.requirement}%` };
    }

    if (query.startDate) {
        whereClause.startDate = { [Op.like]: `%${query.startDate}%` };
    }

    if (query.endDate) {
        whereClause.endDate = { [Op.like]: `%${query.endDate}%` };
    }

    if (query.maxSemester) {
        whereClause.maxSemester = { [Op.gte]: parseInt(query.maxSemester) };
    }

    if (query.educationId) {
        whereClause.educationId = { [Op.eq]: query.educationId };
    }

    if (query.typeId) {
        whereClause.typeId = { [Op.eq]: query.typeId };
    }

    if (query.locationId) {
        whereClause.locationId = { [Op.eq]: query.locationId };
    }

    if (query.categoryId) {
        whereClause.categoryId = { [Op.eq]: query.categoryId };
    }

    if (query.statusId) {
        whereClause.statusId = { [Op.eq]: query.statusId };
    }

    return sequelize.transaction(async (t) => {
        return Scholarship.findAll({
            include: [{ model: EducationLevel }, { model: FundingType }, { model: Location }, { model: Category }, { model: Status }],
            where: whereClause,
            limit: query.limit ? parseInt(query.limit) : undefined,
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

async function accept(id) {
    return await sequelize.transaction(async (t) => {
        return await Scholarship.update({ statusId: 2 }, { where: { id }, transaction: t });
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
    accept,
    destroy
}
