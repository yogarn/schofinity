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
        const { username, name, password, contact, profilePict, roleId } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({
            username, password: hashedPassword, name, contact, profilePict, roleId
        }, { transaction: t });
    });
};

module.exports = {
    find,
    create
}
