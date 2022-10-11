const Sequelize = require('sequelize');
let db = {};

switch (process.env.NODE_ENV) {
    case 'development':
        db.dialect = 'mysql';
        db.host = 'localhost';
        db.database = 'schema';
        db.user = 'yann';
        db.password = 'iPhoneSE11'
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
}

const sequelize = new Sequelize(db.database, db.user, db.password, { dialect: db.dialect, host: db.host });

module.exports = sequelize;
