const db = require('../models/index');
const sequelize = require('../config/sequelize')
const bcrypt = require('bcrypt');

const { User, Role } = db;

async function find() {
    return sequelize.transaction(async (t) => {
        return User.findAll({
            include: [{ model: Role }],
            attributes: { exclude: ['roleId', 'password'] }
        }, { transaction: t });
    });
};

async function create(data) {
    return sequelize.transaction(async (t) => {
        const { username, name, password, contact, email, profilePict, roleId } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({
            username, password: hashedPassword, name, contact, email, profilePict, roleId
        }, { transaction: t });
    });
};

async function update(username, data) {
    return await sequelize.transaction(async (t) => {
        return await User.update(data, { where: { username } }, { transaction: t });
    });
}

module.exports = {
    find,
    create,
    update
}
