const db = require('../models/index');
const sequelize = require('../config/sequelize');
const generatePayments = require('./midtrans');

const { Mentoring, Mentor, User } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        const mentoring = await Mentoring.findAll({
            include: [{ model: Mentor }, { model: User }],
            transaction: t
        });

        mentoring.forEach(element => {
            if (element.statusId !== 2) {
                element.resource = null;
            }
        });

        return mentoring;
    });
};



async function find(id) {
    return sequelize.transaction(async (t) => {
        const mentoring = await Mentoring.findOne({
            include: [{ model: Mentor }, { model: User }],
            where: { id },
            transaction: t
        });

        if (mentoring && mentoring.statusId !== 2) {
            mentoring.resource = null;
        }

        return mentoring;
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

        return transactionToken;
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

async function checkPayment(id) {
    return sequelize.transaction(async (t) => {
        return Mentoring.findOne({
            where: { id, statusId: 2 },
            transaction: t
        });
    });
}

module.exports = {
    findAll,
    find,
    create,
    update,
    mentoringPayments,
    checkPayment
}
