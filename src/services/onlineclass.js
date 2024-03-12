const db = require('../models/index');
const sequelize = require('../config/sequelize');
const { Op } = require('sequelize');
const generatePayments = require('./midtrans');

const { OnlineClass, ClassPayment, Mentor, User } = db;

async function findAll(query) {

    const whereClause = {};

    if (query.name) {
        whereClause.name = { [Op.like]: `%${query.name}%` };
    }

    if (query.description) {
        whereClause.description = { [Op.like]: `%${query.description}%` };
    }

    if (query.typeId) {
        whereClause.typeId = { [Op.eq]: query.typeId };
    }

    if (query.categoryId) {
        whereClause.categoryId = { [Op.eq]: query.categoryId };
    }

    return sequelize.transaction(async (t) => {
        return OnlineClass.findAll({
            include: [{ model: Mentor }],
            where: whereClause,
            transaction: t
        });
    });
};

async function find(id) {
    return sequelize.transaction(async (t) => {
        return OnlineClass.findOne({
            include: [{ model: Mentor }],
            where: { id },
            transaction: t
        });
    });
};

async function findAllPayments(query) {

    const whereClause = {};

    if (query.userId) {
        whereClause.userId = { [Op.eq]: query.userId };
    }

    if (query.classId) {
        whereClause.classId = { [Op.eq]: query.classId };
    }

    if (query.statusId) {
        whereClause.statusId = { [Op.eq]: query.statusId };
    }

    return sequelize.transaction(async (t) => {
        return ClassPayment.findAll({
            include: [{ model: User }, { model: OnlineClass }],
            where: whereClause,
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
        return OnlineClass.create(data, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await OnlineClass.update(data, { where: { id }, transaction: t });
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
