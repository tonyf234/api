const Sequelize = require('sequelize');

const db = {
    dialect: 'mysql',
    host: 'localhost',
    database: 'schema',
    user: 'root',
    password: 'password'
};

const sequelize = new Sequelize(db.database, db.user, db.password, { dialect: db.dialect, host: db.host });

module.exports = sequelize;
