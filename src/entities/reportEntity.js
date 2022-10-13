const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const reportTypes = ['nature', 'obstacle', 'infrastructure', 'dumping', 'association'];

const Report = sequelize.define('report', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type : {
        type: Sequelize.ENUM(...reportTypes),
        allowNull: false,
    },
    date : {
        type: Sequelize.DATE,
        allowNull: true,
    },
    lon: {
        type: Sequelize.DECIMAL(11,2),
        allowNull: true,
    },
    lat: {
        type: Sequelize.DECIMAL(11,2),
        allowNull: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Report;
