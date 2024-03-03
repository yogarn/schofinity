const db = require('../models/index');
const bcrypt = require('bcrypt');

const { User, Role } = db;

async function find() {
    return User.findAll({
        include: [{ model: Role }],
        attributes: { exclude: ['roleId', 'password'] }
    });
};

async function create(data) {
    const { username, name, password, contact, profilePict, roleId } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ username, password: hashedPassword, name, contact, profilePict, roleId });
};

module.exports = {
    find,
    create
}
