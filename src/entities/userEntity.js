const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    lastname: Sequelize.STRING,
    firstname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});
