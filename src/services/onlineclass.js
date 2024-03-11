const db = require('../models/index');
const sequelize = require('../config/sequelize');
const generatePayments = require('./midtrans');

const { OnlineClass, ClassPayment, Mentor } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return OnlineClass.findAll({
            include: [{ model: Mentor }],
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

module.exports = {
    findAll,
    find,
    create,
    update,
    buy,
    classPayment
}