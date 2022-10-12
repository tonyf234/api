const Sequelize = require('sequelize');
const path = require("path");
let db = {};

const env_path = path.resolve(__dirname, './../../.env');
require('dotenv').config({ path: env_path });

switch (process.env.NODE_ENV) {
    case 'development':
        db.dialect = process.env.DEV_DB_DIALECT;
        db.host = process.env.DEV_DB_HOST;
        db.database = process.env.DEV_DB_DATABASE;
        db.user = process.env.DEV_DB_USER;
        db.password = process.env.DEV_DB_PASSWORD;
        break;
    case 'test':
        db.dialect = 'sqlite';
        // TODO
        break;
    case 'production':
        // TODO
        break;
    default:
        throw new Error('unknown environment');
};

const sequelize = new Sequelize(db.database, db.user, db.password, { dialect: db.dialect, host: db.host });

module.exports = sequelize;
