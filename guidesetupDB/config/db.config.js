require('dotenv').config()
const Sequelize = require('sequelize');

module.exports = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.PASS_DB, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    query: {
        raw: true
    },
    timezone: "+07:00",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});