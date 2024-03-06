const db = require('../models/index');
const sequelize = require('../config/sequelize')
const bcrypt = require('bcrypt');

const { User, Role } = db;

async function findAll() {
    return sequelize.transaction(async (t) => {
        return User.findAll({
            include: [{ model: Role }],
            attributes: { exclude: ['roleId', 'password'] }
        }, { transaction: t });
    });
};

async function find(username) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            include: [{ model: Role }],
            attributes: { exclude: ['roleId', 'password'] },
            where: { username }
        }, { transaction: t });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        const { username, name, password, contact, email, image, roleId } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({
            username, password: hashedPassword, name, contact, email, image, roleId
        }, { transaction: t });
    });
};

async function update(username, data) {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return await sequelize.transaction(async (t) => {
        return await User.update(data, { where: { username } }, { transaction: t });
    });
}

module.exports = {
    find,
    findAll,
    create,
    update
}
