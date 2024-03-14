const db = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize')
const bcrypt = require('bcrypt');

const { User, Role } = db;

async function findAll(query) {

    const whereClause = {};
    const order = [];

    const validFields = Object.keys(User.rawAttributes);
    const limit = query.limit ? parseInt(query.limit) : undefined;
    const page = query.page ? parseInt(query.page) : 1;
    const offset = limit ? (page - 1) * limit : undefined;

    console.log(query)

    for (const key in query) {
        const value = query[key];

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

    return sequelize.transaction(async (t) => {
        return User.findAll({
            attributes: { exclude: ['password', 'otp'] },
            where: whereClause,
            limit: limit <= 0 ? 1 : limit,
            offset: offset <= 0 ? 1 : offset,
            order: order.length ? order : undefined,            
            transaction: t
        });
    });
};

async function find(username) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            attributes: { exclude: ['password', 'otp'] },
            where: { username },
            transaction: t
        });
    });
}

async function findByUserId(id) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            attributes: { exclude: ['password', 'otp'] },
            where: { id },
            transaction: t
        });
    });
}

async function getUsername(id) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            where: { id },
            attributes: ['username'],
            transaction: t
        });
    });
}

async function getUserId(username) {
    return sequelize.transaction(async (t) => {
        return User.findOne({
            where: { username },
            attributes: ['id'],
            transaction: t
        });
    });
}

async function create(data) {
    return sequelize.transaction(async (t) => {
        data.password = await bcrypt.hash(data.password, 10);
        return User.create(data, { transaction: t });
    });
};

async function update(id, data) {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return await sequelize.transaction(async (t) => {
        return await User.update(data, { where: { id }, transaction: t });
    });
}

async function destroy(id) {
    return await sequelize.transaction(async (t) => {
        return await User.destroy({ where: { id }, transaction: t });
    });
}

module.exports = {
    find,
    findAll,
    findByUserId,
    getUsername,
    getUserId,
    create,
    update,
    destroy
}
