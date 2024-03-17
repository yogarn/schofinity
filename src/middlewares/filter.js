const { Op } = require('sequelize');

const filter = (model) => {
    return async (req, res, next) => {
        const whereClause = {};
        const order = [];

        const validFields = Object.keys(model.rawAttributes);
        const query = req.query;

        const limit = query.limit ? Math.max(1, parseInt(query.limit)) : undefined;
        const page = query.page ? Math.max(1, parseInt(query.page)) : 1;
        const offset = limit ? (page - 1) * limit : undefined;

        for (const key in query) {
            let value = query[key];
            value = value.trim();

            if (value == '' || value === null || value === undefined) continue;
            if (key === 'limit' || key === 'page' || key === 'sort') continue;
            if (validFields.includes(key)) {
                if (key === 'createdAt') {
                    whereClause['createdAt'] = { [Op.gte]: new Date(value) };
                } else if (key === 'updatedAt') {
                    whereClause['updatedAt'] = { [Op.gte]: new Date(value) };
                } else if (value.includes(',')) {
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

        req.whereClause = whereClause;
        req.order = order;
        req.limit = limit;
        req.offset = offset;

        next();
    };
};

module.exports = filter;
