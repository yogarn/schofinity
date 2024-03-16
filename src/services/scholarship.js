const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')

const { Scholarship, FundingType, ScholarshipCategory, ScholarshipLocation, ScholarshipEducationLevel, Category, Location, EducationLevel, Status } = db;

async function findAll(query) {
    const whereClause = {};
    const semesterWhere = {};

    let categoriesWhere = [];
    let locationsWhere = [];
    let educationsWhere = [];

    const order = [];

    const validFields = Object.keys(Scholarship.rawAttributes);
    const limit = query.limit ? Math.max(1, parseInt(query.limit)) : undefined;
    const page = query.page ? Math.max(1, parseInt(query.page)) : 1;
    const offset = limit ? (page - 1) * limit : undefined;

    for (const key in query) {
        let value = query[key];
        value = value.trim();

        if (value == '' || value === null || value === undefined) continue;
        if (key === 'limit' || key === 'page' || key === 'sort') continue;
        if (validFields.includes(key)) {
            if (value.includes(',')) {
                const values = value.split(',');
                whereClause[key] = { [Op.or]: values.map(item => ({ [Op.like]: `%${item}%` })) };
            } else {
                whereClause[key] = { [Op.like]: `%${value}%` };
            }
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

    if (query.categories) {
        categoriesWhere = query.categories.split(',').map(id => parseInt(id));
    }

    if (query.locations) {
        locationsWhere = query.locations.split(',').map(id => parseInt(id));
    }

    if (query.educations) {
        educationsWhere = query.educations.split(',').map(id => parseInt(id));
        if (query.semester) {
            const semester = parseInt(query.semester);
            semesterWhere.minSemester = { [Op.lte]: semester };
            semesterWhere.maxSemester = { [Op.gte]: semester };
        }
    }

    return sequelize.transaction(async (t) => {
        return Scholarship.findAll({
            include: [
                { model: FundingType },
                {
                    model: EducationLevel,
                    as: 'educations',
                    through: {
                        attributes: ['minSemester', 'maxSemester'],
                        where: semesterWhere
                    },
                    where: educationsWhere.length > 0 ? { id: { [Op.in]: educationsWhere } } : undefined
                },
                {
                    model: Location,
                    as: 'locations',
                    through: { attributes: [] },
                    where: locationsWhere.length > 0 ? { id: { [Op.in]: locationsWhere } } : undefined
                },
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                    where: categoriesWhere.length > 0 ? { id: { [Op.in]: categoriesWhere } } : undefined
                },
                { model: Status }
            ],
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
            include:
                [
                    {
                        model: EducationLevel,
                        as: 'educations',
                        through: {
                            attributes: ['minSemester', 'maxSemester'],
                        },
                    },
                    { model: FundingType },
                    {
                        model: Location,
                        as: 'locations',
                        through: { attributes: [] }
                    },
                    {
                        model: Category,
                        as: 'categories',
                        through: { attributes: [] }
                    },
                    { model: Status }
                ],
            where: { id },
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        const scholarship = await Scholarship.create(data, {
            transaction: t
        });

        for (const item of data.categories) {
            const scholarCategoriesData = {
                scholarshipId: scholarship.id,
                categoryId: item.categoryId
            };

            await ScholarshipCategory.create(scholarCategoriesData, {
                transaction: t
            });
        }

        for (const item of data.locations) {
            const locationsData = {
                scholarshipId: scholarship.id,
                locationId: item.locationId
            };

            await ScholarshipLocation.create(locationsData, {
                transaction: t
            });
        }

        for (const item of data.educations) {
            const educationsData = {
                scholarshipId: scholarship.id,
                educationLevelId: item.educationLevelId,
                minSemester: item.minSemester,
                maxSemester: item.maxSemester
            };

            await ScholarshipEducationLevel.create(educationsData, {
                transaction: t
            });
        }

        return scholarship;
    });
};

async function update(id, data) {
    return sequelize.transaction(async (t) => {
        const scholarship = await Scholarship.update(data, { where: { id }, transaction: t });

        if (data.categories && data.categories.length > 0) {
            const existingCategories = await ScholarshipCategory.findAll({ where: { scholarshipId: id }, transaction: t });

            const existingCategoryIds = existingCategories.map(item => item.categoryId);
            const requestedCategoryIds = data.categories.map(item => item.categoryId);

            for (const categoryId of existingCategoryIds) {
                await ScholarshipCategory.destroy({
                    where: {
                        scholarshipId: id,
                        categoryId
                    },
                    transaction: t
                });
            }

            for (const categoryId of requestedCategoryIds) {
                await ScholarshipCategory.create({ scholarshipId: id, categoryId }, { transaction: t });
            }
        }

        if (data.locations && data.locations.length > 0) {
            const existingLocations = await ScholarshipLocation.findAll({ where: { scholarshipId: id }, transaction: t });

            const existingLocationIds = existingLocations.map(item => item.locationId);
            const requestedLocationIds = data.locations.map(item => item.locationId);

            for (const locationId of existingLocationIds) {
                await ScholarshipLocation.destroy({
                    where: {
                        scholarshipId: id,
                        locationId
                    },
                    transaction: t
                });
            }

            for (const locationId of requestedLocationIds) {
                await ScholarshipLocation.create({ scholarshipId: id, locationId }, { transaction: t });
            }
        }

        if (data.educations && data.educations.length > 0) {
            const existingEducations = await ScholarshipEducationLevel.findAll({ where: { scholarshipId: id }, transaction: t });
            const existingEducationIds = existingEducations.map(item => item.educationLevelId);

            for (const educationLevelId of existingEducationIds) {
                await ScholarshipEducationLevel.destroy({
                    where: {
                        scholarshipId: id,
                        educationLevelId,
                    },
                    transaction: t
                });
            }

            for (const item of data.educations) {
                const educationsData = {
                    scholarshipId: id,
                    educationLevelId: item.educationLevelId,
                    minSemester: item.minSemester,
                    maxSemester: item.maxSemester
                };

                await ScholarshipEducationLevel.create(educationsData, {
                    transaction: t
                });
            }
        }

        return scholarship;
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
