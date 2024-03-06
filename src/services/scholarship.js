const db = require('../models/index');
const sequelize = require('../config/sequelize')

const { Scholarship, EducationLevel, FundingType, Location, Category, Status } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return Scholarship.findAll({
            include: [{ model: EducationLevel }, { model: FundingType }, { model: Location }, { model: Category }, { model: Status }],
            attributes: { exclude: ['educationId', 'typeId', 'locationId', 'categoryId', 'statusId'] }
        }, { transaction: t });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return Scholarship.findOne({
            include: [{ model: EducationLevel }, { model: FundingType }, { model: Location }, { model: Category }, { model: Status }],
            attributes: { exclude: ['educationId', 'typeId', 'locationId', 'categoryId', 'statusId'] },
            where: { id }
        }, { transaction: t });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        return Scholarship.create(data, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await Scholarship.update(data, { where: { id } }, { transaction: t });
    });
}

module.exports = {
    findAll,
    find,
    create,
    update
}
