const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mariadb',
        logging: false,
        dialectOptions: {
            useUTC: false
        },
        timezone: 'Asia/Jakarta',
        pool: {
            max: 5,
            min: 0,
            acquire: 30 * 1000,
            idle: 10 * 1000
        }
    },
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

module.exports = sequelize;
