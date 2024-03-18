const db = require('../models/index');
const sequelize = require('../config/sequelize');
const { Op } = require('sequelize');
const generatePayments = require('./midtrans');

const { OnlineClass, ClassSubject, ClassType, Subject, ClassPayment, Mentor, User } = db;

async function findAll(query) {
    const whereClause = {};
    let subjectsWhere = [];
    const order = [];

    const validFields = Object.keys(OnlineClass.rawAttributes);
    const limit = query.limit ? Math.max(1, parseInt(query.limit)) : undefined;
    const page = query.page ? Math.max(1, parseInt(query.page)) : 1;
    const offset = limit ? (page - 1) * limit : undefined;

    for (const key in query) {
        let value = query[key];
        value = value.trim();

        if (value == '' || value === null || value === undefined) continue;
        if (key === 'limit' || key === 'page' || key === 'sort') continue;
        if (validFields.includes(key)) {
            if (key === 'startDate') {
                whereClause[key] = { [Op.gte]: new Date(value) };
            } else if (key === 'endDate') {
                whereClause[key] = { [Op.lte]: new Date(value) };
            } else if (key === 'createdAt') {
                whereClause['createdAt'] = { [Op.gte]: new Date(value) };
            } else if (key === 'updatedAt') {
                whereClause['updatedAt'] = { [Op.gte]: new Date(value) };
            } else if (value.includes(',')) {
                const values = value.split(',');
                whereClause[key] = { [Op.or]: values.map(item => ({ [Op.like]: `%${item}%` })) };
            } else if (key == 'price') {
                whereClause[key] = { [Op.eq]: value };
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

    if (query.subjects) {
        subjectsWhere = query.subjects.split(',').map(id => parseInt(id));
    }

    return sequelize.transaction(async (t) => {
        return OnlineClass.findAll({
            include: [
                { model: Mentor },
                {
                    model: Subject,
                    as: 'subjects',
                    through: {
                        attributes: [],
                    },
                    where: subjectsWhere.length > 0 ? { id: { [Op.in]: subjectsWhere } } : undefined,
                },
                { model: ClassType, as: 'classType' }
            ],
            where: whereClause,
            limit: limit,
            offset: offset,
            order: order,
            transaction: t
        });
    });
};

async function findByMentorId(mentorId) {
    return sequelize.transaction(async (t) => {
        return OnlineClass.findAll({
            include: [
                { model: Mentor },
                {
                    model: Subject,
                    as: 'subjects',
                    through: {
                        attributes: [],
                    }
                },
                { model: ClassType, as: 'classType' }
            ],
            where: { mentorId },
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return OnlineClass.findOne({
            include: [
                { model: Mentor },
                {
                    model: Subject,
                    as: 'subjects',
                    through: {
                        attributes: [],
                    }
                },
                { model: ClassType, as: 'classType' }
            ],
            where: { id },
            transaction: t
        });
    });
};

async function findAllPayments(whereClause, order, limit, offset) {
    return sequelize.transaction(async (t) => {
        return ClassPayment.findAll({
            include: [{ model: User }, { model: OnlineClass }],
            where: whereClause,
            limit: limit,
            offset: offset,
            order: order,
            transaction: t
        });
    });
};

async function findPayment(id) {
    return sequelize.transaction(async (t) => {
        return ClassPayment.findOne({
            include: [{ model: User }, { model: OnlineClass }],
            where: { id },
            transaction: t
        });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        const onlineClass = await OnlineClass.create(data, { transaction: t });

        for (const item of data.subjects) {
            const classSubjectsData = {
                onlineClassId: onlineClass.id,
                subjectId: item.subjectId
            };

            await ClassSubject.create(classSubjectsData, {
                transaction: t
            });
        }

        return onlineClass;
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        const onlineClass = await OnlineClass.update(data, { where: { id }, transaction: t });

        if (data.subjects && data.subjects.length > 0) {
            const existingSubjects = await ClassSubject.findAll({ where: { onlineClassId: id }, transaction: t });

            const existingSubjectIds = existingSubjects.map(item => item.subjectId);
            const requestedSubjectIds = data.subjects.map(item => item.subjectId);

            for (const subjectId of existingSubjectIds) {
                await ClassSubject.destroy({
                    where: {
                        onlineClassId: id,
                        subjectId
                    },
                    transaction: t
                });
            }

            for (const subjectId of requestedSubjectIds) {
                await ClassSubject.create({ onlineClassId: id, subjectId }, { transaction: t });
            }
        }

        return onlineClass;
    });
};

async function destroy(id) {
    return await sequelize.transaction(async (t) => {
        return await OnlineClass.destroy({ where: { id }, transaction: t });
    });
};

async function buy(data) {
    return sequelize.transaction(async (t) => {
        const classPayment = await ClassPayment.create(data, { transaction: t });
        const transactionToken = await generatePayments(data.orderId, data.price, data.user.name, data.user.email, data.user.contact);

        if (!transactionToken) {
            throw new Error("Failed to generate payment")
        }

        await classPayment.update({ transactionToken }, { transaction: t });

        return transactionToken;
    });
};

async function updatePayment(id, data) {
    return await sequelize.transaction(async (t) => {
        return await ClassPayment.update(data, { where: { id }, transaction: t });
    });
};

async function classPayment(id, transactionStatus, fraudStatus) {
    if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
            await updatePayment(id, { statusId: 2 })
        }
    } else if (transactionStatus == 'settlement') {
        await updatePayment(id, { statusId: 2 })
    } else if (transactionStatus == 'cancel' ||
        transactionStatus == 'deny' ||
        transactionStatus == 'expire') {
        await updatePayment(id, { statusId: 3 })
    } else if (transactionStatus == 'pending') {
        await updatePayment(id, { statusId: 1 })
    }
}

async function checkPayment(userId, classId) {
    return sequelize.transaction(async (t) => {
        return ClassPayment.findOne({
            where: { classId, userId, statusId: 2 },
            transaction: t
        });
    });
}

module.exports = {
    findAll,
    findByMentorId,
    find,
    findAllPayments,
    findPayment,
    create,
    update,
    destroy,
    buy,
    classPayment,
    checkPayment
}
