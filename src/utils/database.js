const Sequelize = require('sequelize');

const sequelizeConnection = {
    dialect: 'mysql',
    host: 'localhost',
    database: 'schema',
    user: 'root',
    password: 'password'
};

const sequelize = new Sequelize(database, user, password, { dialect, host });

module.exports = sequelize;
