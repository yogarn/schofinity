const db = require('../models/index');
const sequelize = require('../config/sequelize')

const { Scholarship, EducationLevel, FundingType, Location, Category } = db;

async function find() {
    return sequelize.transaction(async (t) => {
        return Scholarship.findAll({
            include: [{ model: EducationLevel }, { model: FundingType }, { model: Location }, { model: Category }],
            attributes: { exclude: ['educationId', 'typeId', 'locationId', 'categoryId'] }
        }, { transaction: t });
    });
};

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
    find,
    create,
    update
}
