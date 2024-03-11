const db = require('../models/index');
const sequelize = require('../config/sequelize');
const generatePayments = require('./midtrans');

const { Mentoring, Mentor, User } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return Mentoring.findAll({
            include: [{ model: Mentor }, { model: User }],
            transaction: t
        });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        const mentoring = await Mentoring.create(data, { transaction: t });
        const transactionToken = await generatePayments(data.orderId, data.mentor.salaryRate, data.user.name, data.user.email, data.user.contact);

        if (!transactionToken) {
            throw new Error("Failed to generate payment")
        }

        await mentoring.update({ transactionToken }, { transaction: t });
    });
};

async function update(id, data) {
    return await sequelize.transaction(async (t) => {
        return await Mentoring.update(data, { where: { id }, transaction: t });
    });
}

async function mentoringPayments(id, transactionStatus, fraudStatus) {
    if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
            await update(id, { statusId: 2 })
        }
    } else if (transactionStatus == 'settlement') {
        await update(id, { statusId: 2 })
    } else if (transactionStatus == 'cancel' ||
        transactionStatus == 'deny' ||
        transactionStatus == 'expire') {
        await update(id, { statusId: 3 })
    } else if (transactionStatus == 'pending') {
        await update(id, { statusId: 1 })
    }
}

module.exports = {
    findAll,
    create,
    update,
    mentoringPayments
}
