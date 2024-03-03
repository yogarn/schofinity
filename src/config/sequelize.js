const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'schofinity', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS || '', 
    {
        host: 'localhost',
        dialect: 'mariadb',
        logging: console.log,
        define: {
            underscored: true
        }
    }
);

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

module.exports = {
    sequelize
}
